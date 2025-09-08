import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import Navbar from '../components/layout/Navbar';
import styles from './HomePage.module.css';
import { FiEdit, FiDownload, FiTrash2, FiPlus } from 'react-icons/fi';

const HomePage = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    const fetchResumes = async () => {
      try {
        const response = await api.get('/resumes');
        setResumes(response.data);
      } catch (err) {
        setError('Failed to fetch resumes.');
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, [navigate]);

  const handleCreateNew = () => {
    navigate('/templates');
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
        try {
            await api.delete(`/resumes/${id}`);
            setResumes(resumes.filter(r => r._id !== id));
        } catch (err) {
            setError('Failed to delete resume.');
        }
    }
  };

  /**
   * Handles downloading the resume PDF.
   * This function now uses the 'api' instance to make an authenticated request.
   * @param {string} id - The ID of the resume to download.
   */
  const handleDownload = async (id) => {
    try {
      const response = await api.get(`/resumes/${id}/download`, {
        responseType: 'blob', // Important: tells axios to expect binary data
      });

      // Create a URL for the blob data
      const url = window.URL.createObjectURL(new Blob([response.data]));
      
      // Create a temporary link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      
      // Find the resume to get the name for the file
      const resume = resumes.find(r => r._id === id);
      const filename = resume?.resumeData?.personalDetails?.name?.replace(/\s+/g, '_') || 'resume';
      link.setAttribute('download', `${filename}.pdf`);
      
      // Append to the document, click, and then remove
      document.body.appendChild(link);
      link.click();
      
      // Clean up by revoking the object URL and removing the link
      window.URL.revokeObjectURL(url);
      link.parentNode.removeChild(link);

    } catch (err) {
      setError('Failed to download PDF. Please try again.');
    }
  };

  if (loading) return <div className={styles.centered}>Loading your dashboard...</div>;

  return (
    <>
      <Navbar />
      <main className={styles.mainContainer}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>Your Resumes</h2>
          <button onClick={handleCreateNew} className={styles.createButton}>
            <FiPlus style={{ marginRight: '8px' }} />
            Create New
          </button>
        </div>
        {error && <p className={styles.errorBox}>{error}</p>}
        {resumes.length > 0 ? (
          <div className={styles.grid}>
            {resumes.map((resume) => (
              <div key={resume._id} className={styles.card}>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{resume.resumeData.personalDetails?.name || 'Untitled'}</h3>
                  <p className={styles.cardSubtitle}>Template: {resume.templateName}</p>
                  <p className={styles.cardSubtitle}>Updated: {new Date(resume.updatedAt).toLocaleDateString()}</p>
                </div>
                <div className={styles.cardActions}>
                  <button onClick={() => navigate(`/editor/${resume._id}`)} className={styles.actionButton}>
                    <FiEdit /> <span>Edit</span>
                  </button>
                  <button onClick={() => handleDownload(resume._id)} className={styles.actionButton}>
                    <FiDownload /> <span>Download</span>
                  </button>
                  <button onClick={() => handleDelete(resume._id)} className={`${styles.actionButton} ${styles.deleteButton}`}>
                    <FiTrash2 /> <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className={styles.emptyState}>
              <h3>No resumes found.</h3>
              <p>Click "Create New" to get started!</p>
            </div>
          )
        )}
      </main>
    </>
  );
};

export default HomePage;