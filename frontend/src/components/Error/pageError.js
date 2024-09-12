import React from 'react';
import styles from './pageError.module.css';

const ErrorPage = ({ message }) => {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Oops!</h1>
            <p className={styles.message}>{message || "Algo deu errado. Por favor, tente novamente mais tarde."}</p>
            <button className={styles.button} onClick={handleReload}>Recarregar</button>
        </div>
    );
};

export default ErrorPage;
