import React from 'react';
import styles from './KeyButton.module.scss';

function KeyButton({ handleKeyboradEvent, keyIndex, keyValue }) {
    return (
        <button
            onClick={() => handleKeyboradEvent(keyValue)}
            key={keyIndex}
            className={styles.keyButton}
        >
            {keyValue === 1 ? 'Enter' : keyValue === -1 ? 'Delete' : keyValue}
        </button>
    );
}

export default KeyButton;
