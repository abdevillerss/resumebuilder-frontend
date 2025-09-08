import React, { useState } from 'react';
import api from '../api/api';
import styles from './AuthPage.module.css';
import { FiBriefcase } from 'react-icons/fi';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const switchModeHandler = () => {
        setIsLogin((prevMode) => !prevMode);
        setError('');
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        
        const endpoint = isLogin ? 'auth/login' : 'auth/register';
        const payload = isLogin ? { email, password } : { username, email, password };
        
        try {
            const response = await api.post(endpoint, payload);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
            window.location.href = '/';
        } catch (err) {
            setError(err.response?.data?.message || 'An unexpected error occurred. Please check the server connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.brandingContainer}>
                <div className={styles.brandContent}>
                    <FiBriefcase className={styles.brandIcon} />
                    <h1 className={styles.brandTitle}>Resume Pro</h1>
                    <p className={styles.brandSubtitle}>Craft a professional resume that stands out and lands you your dream job.</p>
                </div>
            </div>
            <div className={styles.authContainer}>
                <div className={styles.authCard}>
                    <h2 className={styles.title}>
                        {isLogin ? 'Welcome Back!' : 'Create Your Account'}
                    </h2>
                    <p className={styles.subtitle}>
                        {isLogin ? 'Log in to continue to your dashboard.' : 'Get started in just a few clicks.'}
                    </p>
                    
                    {error && <p className={styles.errorBox}>{error}</p>}

                    <form className={styles.form} onSubmit={submitHandler}>
                        {!isLogin && (
                            <div className={styles.inputGroup}>
                                <label htmlFor="username">Username</label>
                                <input id="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g., Jane Doe" />
                            </div>
                        )}
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email Address</label>
                            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                        </div>
                        <div>
                            <button type="submit" disabled={loading} className={styles.submitButton}>
                                {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
                            </button>
                        </div>
                    </form>

                    <div className={styles.switchMode}>
                        <button onClick={switchModeHandler} className={styles.switchButton}>
                            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;

// ... your other imports
// test 
// function AuthPage() {
  
//   // --- START: NEW TEST FUNCTION ---
//   const handleCorsTest = async () => {
//     const backendUrl = 'https://ats-resume-builder-15q7hjhr3-pavan-s-projects-ee943b68.vercel.app/api/debug-cors';
//     console.log(`Testing connection to: ${backendUrl}`);
//     try {
//       const response = await fetch(backendUrl);
//       const data = await response.json();
//       console.log('SUCCESS:', data);
//       alert('SUCCESS! The backend responded: ' + data.message);
//     } catch (error) {
//       console.error('ERROR:', error);
//       alert('ERROR! Check the console for details.');
//     }
//   };
//   // --- END: NEW TEST FUNCTION ---

//   return (
//     <div>
//       {/* ... your existing login form ... */}

//       {/* --- START: NEW TEST BUTTON --- */}
//       <div style={{marginTop: '20px', border: '2px solid red', padding: '10px'}}>
//         <h2>Backend Connection Test</h2>
//         <button onClick={handleCorsTest}>Test Connection</button>
//       </div>
//       {/* --- END: NEW TEST BUTTON --- */}
//     </div>
//   );
// }

// export default AuthPage;
