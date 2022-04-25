import React from 'react';

import { keyboardKeys } from '../datasources/words';
import KeyButton from './KeyButton';
import styles from './Keyboard.module.scss';

function Keyboard() {
    const dispatchKeyboardEvent = (key) => {
        let _key = key;
        if (_key === 1) {
            _key = 'Enter';
        } else if (key === -1) {
            _key = 'Backspace';
        }
        window.dispatchEvent(
            new KeyboardEvent('keydown', {
                key: _key,
            }),
        );
    };
    return (
        <div className={styles.gameKeyboardContainer}>
            <div className={styles.keyboardContainer} id="keyboard">
                {keyboardKeys?.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className={styles.keyboardRow}
                        style={{
                            paddingLeft: rowIndex === 1 ? '22px' : '',
                        }}
                    >
                        {row?.map((keyValue, keyIndex) => (
                            <KeyButton
                                key={keyIndex}
                                keyValue={keyValue}
                                handleKeyboradEvent={dispatchKeyboardEvent}
                                keyIndex={keyIndex}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Keyboard;
