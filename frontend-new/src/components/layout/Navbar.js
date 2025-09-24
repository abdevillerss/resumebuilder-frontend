// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import styles from './Navbar.module.css';

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/auth');
//   };

//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.container}>
//         <Link to="/" className={styles.brand}>
//           <img src="/newicon.png" alt="ResumeWise AI icon" className={styles.logo} />
//           <span>ResumeWise AI</span>
//         </Link>
//         <div className={styles.navLinks}>
//           {user ? (
//             <>
//               <span className={styles.welcomeMessage}>Welcome, {user.username}</span>
//               <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
//               <button onClick={handleLogout} className={`${styles.actionButton} ${styles.secondaryButton}`}>Logout</button>
//             </>
//           ) : (
//             <>
//               <Link to="/auth" className={styles.navLink}>Login</Link>
//               <Link to="/auth" className={styles.actionButton}>Sign Up</Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { useAuth } from '../../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  // Check if current path is the Auth page
  const isAuthPage = location.pathname === '/auth';

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand}>
          <img src="/newicon.png" alt="ResumeWise AI icon" className={styles.logo} />
          <span>ResumeWise AI</span>
        </Link>
        <div className={styles.navLinks}>
          {user ? (
            <>
              <span className={styles.welcomeMessage}>Welcome, {user.username}</span>
              <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
              <button onClick={handleLogout} className={`${styles.actionButton} ${styles.secondaryButton}`}>Logout</button>
            </>
          ) : (
            // Only show Login/Sign Up buttons if not on the Auth page
            !isAuthPage && (
              <>
                <Link to="/auth" className={styles.navLink}>Login</Link>
                <Link to="/auth" className={styles.actionButton}>Sign Up</Link>
              </>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;