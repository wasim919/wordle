import React from 'react';

import { keyboardKeys } from '../datasources/words';
import styles from './Keyboard.module.scss';

function Keyboard() {
    return (
        <div className={styles.gameKeyboardContainer}>
            <div className={styles.keyboardContainer}>
                {keyboardKeys?.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className={styles.keyboardRow}
                        style={{
                            paddingLeft: rowIndex === 1 ? '22px' : '',
                        }}
                    >
                        {row?.map((key, keyIndex) => (
                            <button key={keyIndex} className={styles.keyButton}>
                                {key === 1
                                    ? 'Enter'
                                    : key === -1
                                    ? 'Delete'
                                    : key}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Keyboard;
