import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import Navbar from '../components/layout/Navbar';
import styles from './resumeeditor.module.css';
import { FiSave, FiPlus, FiTrash2, FiEdit2, FiRefreshCw, FiArrowUp, FiArrowDown } from 'react-icons/fi';

// Default structure for a new resume
const defaultSections = [
    { key: 'personalDetails', title: 'Personal Details', type: 'object' },
    { key: 'summary', title: 'Professional Summary', type: 'string' },
    { key: 'experience', title: 'Work Experience', type: 'array' },
    { key: 'projects', title: 'Projects', type: 'array' },
    { key: 'education', title: 'Education', type: 'array' },
    { key: 'skills', title: 'Skills', type: 'array' },
];

const EditorPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [resume, setResume] = useState(null);
    const [pdfUrl, setPdfUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [previewLoading, setPreviewLoading] = useState(false);
    const [error, setError] = useState('');

    // Memoized function to update the PDF preview
    const updatePreview = useCallback(async (currentResume) => {
        if (!currentResume) return;
        setPreviewLoading(true);
        try {
            const response = await api.post('/resumes/preview', {
                resumeData: currentResume.resumeData,
                templateName: currentResume.templateName
            }, { responseType: 'blob' });

            const newPdfUrl = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

            if (pdfUrl) {
                window.URL.revokeObjectURL(pdfUrl);
            }
            setPdfUrl(newPdfUrl);
        } catch (err) {
            setError("Failed to update PDF preview.");
            console.error(err);
        } finally {
            setPreviewLoading(false);
        }
    }, [pdfUrl]);

    // Effect to fetch initial resume data
    useEffect(() => {
        const fetchResumeData = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(`/resumes/${id}`);
                data.resumeData = data.resumeData || {};
                data.resumeData.sections = data.resumeData.sections || defaultSections;
                setResume(data);
                // Generate the initial preview when the editor loads
                updatePreview(data);
            } catch (err) {
                setError('Failed to load resume data.');
            } finally {
                setLoading(false);
            }
        };

        fetchResumeData();
        // The dependency array is empty for updatePreview because we only want the initial fetch and render.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    // NOTE: The automatic preview update useEffect has been removed to prevent flickering.
    // The preview now only updates on initial load and when the "Refresh" button is clicked.

    // Generic handler to update nested state in the resume data
    const handleDataChange = (path, value) => {
        setResume(prev => {
            const keys = path.split('.');
            const newData = JSON.parse(JSON.stringify(prev.resumeData));
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current[keys[i]] = current[keys[i]] || (isNaN(parseInt(keys[i+1])) ? {} : []);
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return { ...prev, resumeData: newData };
        });
    };

    // Adds a new item to a section array
    const addArrayItem = (sectionKey, defaultItem = {}) => {
        const currentArray = resume.resumeData[sectionKey] || [];
        handleDataChange(sectionKey, [...currentArray, defaultItem]);
    };

    // Removes an item from a section array
    const removeArrayItem = (sectionKey, index) => {
        const currentArray = resume.resumeData[sectionKey] || [];
        handleDataChange(sectionKey, currentArray.filter((_, i) => i !== index));
    };
    
    // Adds a new custom section
    const addSection = () => {
        const newSectionName = prompt('Enter a name for the new section (e.g., Certifications):');
        if (newSectionName) {
            const newSectionKey = newSectionName.toLowerCase().replace(/\s+/g, '');
            const newSections = [...resume.resumeData.sections, { key: newSectionKey, title: newSectionName, isCustom: true, type: 'array' }];
            handleDataChange('sections', newSections);
            handleDataChange(newSectionKey, []);
        }
    };

    // Renames an existing section
    const renameSection = (sectionKey, currentTitle) => {
        const newTitle = prompt('Enter the new name for this section:', currentTitle);
        if (newTitle) {
            const newSections = resume.resumeData.sections.map(sec => sec.key === sectionKey ? { ...sec, title: newTitle } : sec);
            handleDataChange('sections', newSections);
        }
    };

    // Deletes a custom section
    const deleteSection = (sectionKey) => {
        if (window.confirm('Are you sure you want to delete this entire section?')) {
            const newSections = resume.resumeData.sections.filter(sec => sec.key !== sectionKey);
            handleDataChange('sections', newSections);
            const newData = { ...resume.resumeData };
            delete newData[sectionKey];
            setResume(prev => ({...prev, resumeData: newData}));
        }
    };
    
    // Moves a section up or down
    const moveSection = (index, direction) => {
        const newIndex = index + direction;
        const sections = resume.resumeData.sections;
        if (newIndex < 0 || newIndex >= sections.length) return;
        const newSections = [...sections];
        const [movedSection] = newSections.splice(index, 1);
        newSections.splice(newIndex, 0, movedSection);
        handleDataChange('sections', newSections);
    };

    // Saves the resume
    const handleSave = async () => {
        setSaving(true);
        setError('');
        try {
            await api.put(`/resumes/${id}`, {
                resumeData: resume.resumeData,
                templateName: resume.templateName
            });
            navigate('/');
        } catch (err) {
            setError('Failed to save resume.');
        } finally {
            setSaving(false);
        }
    };

    // Renders the form fields for each section
    const renderSectionFields = (section) => {
        const data = resume.resumeData;
        switch (section.key) {
            case 'personalDetails':
                 return (
                    <div className={styles.gridFields}>
                        <input type="text" placeholder="Full Name" value={data.personalDetails?.name || ''} onChange={e => handleDataChange('personalDetails.name', e.target.value)} />
                        <input type="text" placeholder="Professional Title" value={data.personalDetails?.title || ''} onChange={e => handleDataChange('personalDetails.title', e.target.value)} />
                        <input type="email" placeholder="Email" value={data.personalDetails?.email || ''} onChange={e => handleDataChange('personalDetails.email', e.target.value)} />
                        <input type="tel" placeholder="Phone" value={data.personalDetails?.phone || ''} onChange={e => handleDataChange('personalDetails.phone', e.target.value)} />
                        <input type="url" placeholder="LinkedIn URL" value={data.personalDetails?.linkedin || ''} onChange={e => handleDataChange('personalDetails.linkedin', e.target.value)} />
                        <input type="url" placeholder="GitHub URL" value={data.personalDetails?.github || ''} onChange={e => handleDataChange('personalDetails.github', e.target.value)} />
                    </div>
                );
            case 'summary':
                return <textarea placeholder={`Your ${section.title.toLowerCase()}...`} value={data[section.key] || ''} onChange={e => handleDataChange(section.key, e.target.value)}></textarea>;
            case 'experience':
            case 'projects':
                return (
                    <>
                        {(data[section.key] || []).map((item, index) => (
                            <div key={index} className={styles.arrayItem}>
                                <div className={styles.gridFields}>
                                    <input type="text" placeholder={section.key === 'experience' ? "Job Title" : "Project Title"} value={item.jobTitle || item.title || ''} onChange={e => handleDataChange(`${section.key}.${index}.${section.key === 'experience' ? 'jobTitle' : 'title'}`, e.target.value)} />
                                    {section.key === 'experience' && <input type="text" placeholder="Company" value={item.company || ''} onChange={e => handleDataChange(`${section.key}.${index}.company`, e.target.value)} />}
                                </div>
                                <textarea placeholder={`A brief description of the ${section.key === 'experience' ? 'role' : 'project'}...`} value={item.about || ''} onChange={e => handleDataChange(`${section.key}.${index}.about`, e.target.value)}></textarea>
                                
                                <label className={styles.bulletLabel}>Achievements / Bullet Points:</label>
                                {(item.description || ['']).map((desc, descIndex) => (
                                    <div key={descIndex} className={styles.bulletItem}>
                                        <input type="text" placeholder="Detail or achievement" value={desc} onChange={e => {
                                            const newDescriptions = [...item.description];
                                            newDescriptions[descIndex] = e.target.value;
                                            handleDataChange(`${section.key}.${index}.description`, newDescriptions);
                                        }} />
                                        <button onClick={() => {
                                            const newDescriptions = item.description.filter((_, i) => i !== descIndex);
                                            handleDataChange(`${section.key}.${index}.description`, newDescriptions);
                                        }} className={styles.deleteBulletButton}><FiTrash2 /></button>
                                    </div>
                                ))}
                                <button onClick={() => {
                                    const newDescriptions = [...(item.description || []), ''];
                                    handleDataChange(`${section.key}.${index}.description`, newDescriptions);
                                }} className={styles.addBulletButton}><FiPlus /> Add Bullet Point</button>
                                
                                <button onClick={() => removeArrayItem(section.key, index)} className={styles.deleteItemButton}><FiTrash2 /> Remove {section.key === 'experience' ? 'Experience' : 'Project'}</button>
                            </div>
                        ))}
                        <button onClick={() => addArrayItem(section.key, {description: ['']})} className={styles.addItemButton}><FiPlus /> Add {section.key === 'experience' ? 'Experience' : 'Project'}</button>
                    </>
                );
            case 'education':
                 return (
                    <>
                        {(data[section.key] || []).map((item, index) => (
                            <div key={index} className={styles.arrayItem}>
                                <div className={styles.gridFields}>
                                    <input type="text" placeholder="School/University" value={item.school || ''} onChange={e => handleDataChange(`${section.key}.${index}.school`, e.target.value)} />
                                    <input type="text" placeholder="Degree" value={item.degree || ''} onChange={e => handleDataChange(`${section.key}.${index}.degree`, e.target.value)} />
                                    <input type="text" placeholder="Graduation Date" value={item.gradDate || ''} onChange={e => handleDataChange(`${section.key}.${index}.gradDate`, e.target.value)} />
                                </div>
                                <button onClick={() => removeArrayItem(section.key, index)} className={styles.deleteItemButton}><FiTrash2 /> Remove Education</button>
                            </div>
                        ))}
                        <button onClick={() => addArrayItem(section.key)} className={styles.addItemButton}><FiPlus /> Add Education</button>
                    </>
                );
            case 'skills':
                return (
                    <>
                        <div className={styles.skillsGrid}>
                            {(data.skills || ['']).map((skill, index) => (
                                <div key={index} className={styles.skillItem}>
                                    <input type="text" placeholder="Skill" value={skill} onChange={e => {
                                        const newSkills = [...data.skills];
                                        newSkills[index] = e.target.value;
                                        handleDataChange('skills', newSkills);
                                    }} />
                                    <button onClick={() => removeArrayItem('skills', index)} className={styles.deleteBulletButton}><FiTrash2 /></button>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => addArrayItem('skills', '')} className={styles.addItemButton}><FiPlus /> Add Skill</button>
                    </>
                );
            default: // For custom sections
                 return (
                    <>
                        {(data[section.key] || []).map((item, index) => (
                            <div key={index} className={styles.arrayItem}>
                                <input type="text" placeholder="Title / Main Field" value={item.title || ''} onChange={e => handleDataChange(`${section.key}.${index}.title`, e.target.value)} />
                                <textarea placeholder="Description..." value={item.description || ''} onChange={e => handleDataChange(`${section.key}.${index}.description`, e.target.value)}></textarea>
                                <button onClick={() => removeArrayItem(section.key, index)} className={styles.deleteItemButton}><FiTrash2 /> Remove Item</button>
                            </div>
                        ))}
                        <button onClick={() => addArrayItem(section.key)} className={styles.addItemButton}><FiPlus /> Add Item</button>
                    </>
                );
        }
    };

    if (loading) return <div className={styles.centeredMessage}>Loading Editor...</div>;
    if (error) return <div className={`${styles.centeredMessage} ${styles.errorBox}`}>{error}</div>;
    if (!resume) return <div className={styles.centeredMessage}>No resume data found.</div>;

    return (
        <>
            <Navbar />
            <div className={styles.editorLayout}>
                <main className={styles.editorContainer}>
                    <header className={styles.header}>
                        <h2 className={styles.title}>Editing: {resume.resumeData.personalDetails?.name || 'Untitled Resume'}</h2>
                        <div className={styles.headerActions}>
                            <button onClick={addSection} className={styles.actionButton}><FiPlus/> Add Section</button>
                            <button onClick={handleSave} disabled={saving} className={styles.saveButton}>
                                <FiSave />
                                {saving ? 'Saving...' : 'Save & Close'}
                            </button>
                        </div>
                    </header>

                    <div className={styles.formGrid}>
                        {resume.resumeData.sections.map((section, index) => (
                             <section key={section.key} className={styles.formSection}>
                                <div className={styles.sectionHeader}>
                                    <h3>{section.title}</h3>
                                    <div className={styles.sectionControls}>
                                        <button onClick={() => renameSection(section.key, section.title)} title="Rename Section"><FiEdit2/></button>
                                        <button onClick={() => moveSection(index, -1)} disabled={index === 0} title="Move Up"><FiArrowUp /></button>
                                        <button onClick={() => moveSection(index, 1)} disabled={index === resume.resumeData.sections.length - 1} title="Move Down"><FiArrowDown /></button>
                                        {section.isCustom && <button onClick={() => deleteSection(section.key)} title="Delete Section" className={styles.deleteSectionButton}><FiTrash2/></button>}
                                    </div>
                                </div>
                                {renderSectionFields(section)}
                            </section>
                        ))}
                    </div>
                </main>
                <aside className={styles.previewContainer}>
                    <div className={styles.previewHeader}>
                        <h3>Live Preview</h3>
                        <button onClick={() => updatePreview(resume)} disabled={previewLoading} className={styles.updatePreviewButton}>
                            <FiRefreshCw className={previewLoading ? styles.spinning : ''} />
                            <span>{previewLoading ? 'Updating...' : 'Refresh Preview'}</span>
                        </button>
                    </div>
                    {pdfUrl ? (
                        <iframe src={pdfUrl} title="Resume Preview" className={styles.pdfPreview} />
                    ) : (
                        <div className={styles.centeredMessage}>{previewLoading ? 'Generating Preview...' : 'Your preview will appear here.'}</div>
                    )}
                </aside>
            </div>
        </>
    );
};

export default EditorPage;