import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import Navbar from '../components/layout/Navbar';
import styles from './template.module.css';

const TemplateSelectionPage = () => {
    const navigate = useNavigate();
    const [selectedTemplate, setSelectedTemplate] = useState('modern');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCreateResume = async () => {
        setLoading(true);
        setError('');
        try {
            // This payload now matches the new data structure expected by the editor
            const newResumePayload = {
                templateName: selectedTemplate,
                resumeData: {
                  personalDetails: { 
                      name: 'Your Name', 
                      title: 'Professional Title', 
                      email: 'your.email@example.com', 
                      phone: '123-456-7890', 
                      linkedin: 'linkedin.com/in/yourprofile',
                      github: 'github.com/yourusername'
                  },
                  summary: 'A brief professional summary about you. Highlight your key skills and career goals.',
                  // Experience items now have a description array for bullet points
                  experience: [{ 
                      jobTitle: 'Job Title', 
                      company: 'Company Name', 
                      about: 'A short description of your responsibilities in this role.', 
                      description: ['Your key achievement or contribution.'] 
                  }],
                  education: [{ 
                      school: 'University Name', 
                      degree: 'Your Degree',
                      gradDate: 'Month Year'
                  }],
                  // Skills is now an array of strings
                  skills: ['Skill 1', 'Skill 2', 'Skill 3'], 
                  // Projects also have a description array
                  projects: [{ 
                      title: 'Project Title', 
                      about: 'A brief overview of the project, its purpose, and the technologies used.', 
                      description: ['A specific feature you implemented or a problem you solved.'] 
                  }],
                  // The sections array defines the order and titles in the editor
                  sections: [
                    { key: 'personalDetails', title: 'Personal Details', type: 'object' },
                    { key: 'summary', title: 'Professional Summary', type: 'string' },
                    { key: 'experience', title: 'Work Experience', type: 'array' },
                    { key: 'projects', title: 'Projects', type: 'array' },
                    { key: 'education', title: 'Education', type: 'array' },
                    { key: 'skills', title: 'Skills', type: 'array' },
                  ]
              }
            };
            const response = await api.post('/resumes', newResumePayload);
            // Navigate to the editor for the newly created resume
            navigate(`/editor/${response.data._id}`);
        } catch (err) {
            setError('Could not create resume. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <main className={styles.container}>
                <header className={styles.header}>
                    <h2 className={styles.title}>Choose Your Template</h2>
                    <p className={styles.subtitle}>Select a professionally designed template to start with.</p>
                </header>

                {error && <p className={styles.errorBox}>{error}</p>}

                <div className={styles.templateGrid}>
                    <div
                        className={`${styles.templateCard} ${selectedTemplate === 'modern' ? styles.selected : ''}`}
                        onClick={() => setSelectedTemplate('modern')}
                    >
                        <img src="/modren.png" alt="Modern Template Preview" className={styles.templateImage} />
                        <h3 className={styles.templateName}>Modern</h3>
                    </div>
                    <div
                        className={`${styles.templateCard} ${selectedTemplate === 'classic' ? styles.selected : ''}`}
                        onClick={() => setSelectedTemplate('classic')}
                    >
                        <img src="/classic.png" alt="Classic Template Preview" className={styles.templateImage} />
                        <h3 className={styles.templateName}>Classic</h3>
                    </div>
                    <div
                        className={`${styles.templateCard} ${selectedTemplate === 'professional' ? styles.selected : ''}`}
                        onClick={() => setSelectedTemplate('professional')}
                    >
                        <img src="/professional.png" alt="Professional Template Preview" className={styles.templateImage} />
                        <h3 className={styles.templateName}>Professional</h3>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button onClick={handleCreateResume} disabled={loading} className={styles.continueButton}>
                        {loading ? 'Creating...' : 'Continue with this template'}
                    </button>
                </div>
            </main>
        </>
    );
};

export default TemplateSelectionPage;
