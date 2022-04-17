import React from 'react';
import styles from './Analytics.module.scss';

function Analytics({ score, tries }) {
    if (!!score && !!tries) {
        return (
            <div className={styles.container}>
                <p className={styles.score}>Score: {score}</p>
                <p className={styles.tries}>Tries: {tries}</p>
            </div>
        );
    }
    return <></>;
}

export default Analytics;
