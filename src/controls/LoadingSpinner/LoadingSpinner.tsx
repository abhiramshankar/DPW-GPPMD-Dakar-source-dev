import React from 'react';
import styles from '@src/controls/LoadingSpinner/LoadingSpinner.module.scss';

export const LoadingSpinner: React.FC = () => {

    return (
        <div className={styles.container}>
            <div className={styles.spinner}></div>
        </div>
    );
};

export default LoadingSpinner;