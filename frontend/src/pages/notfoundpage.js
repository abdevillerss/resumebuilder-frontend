import React from 'react';
import { Link } from 'react-router-dom';
import styles from './notfoundpage.module.css'; // Import CSS Module

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.title}>Page Not Found</h2>
      <p className={styles.message}>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className={styles.homeButton}>
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
