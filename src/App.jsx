import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Keyboard from './components/Keyboard';
import Tiles from './components/Tiles';
import { copyResultToClipboard } from './core/utils';
import useKeyPress from './hooks/useKeyPress';

export default function App() {
    const [isCopied, setIsCopied] = useState(false);
    const [tiles, solved, showModal, isRightWay, userSolution, setShowModal] =
        useKeyPress();

    const copyResult = () => {
        copyResultToClipboard(userSolution);
        setIsCopied(true);
    };

    useEffect(() => {
        const timerId = setTimeout(() => {
            setIsCopied(false);
        }, 2000);
        return () => {
            clearTimeout(timerId);
        };
    }, [isCopied]);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h2 className={styles.header__title}>Wordle</h2>
                {solved && (
                    <span
                        onClick={() => setShowModal(true)}
                        className={styles.header__result}
                    >
                        Result
                    </span>
                )}
            </header>
            <Tiles tiles={tiles} />
            <Keyboard />
            {!isRightWay && (
                <span className={styles.notInWordList}>Not in word list</span>
            )}
            {showModal && (
                <div className={styles.modal}>
                    <div
                        onClick={() => setShowModal(false)}
                        className={styles.modal__close}
                    >
                        X
                    </div>
                    <h2 className={styles.modal__title}>
                        Congratulations🥳, you have solved today's wordle
                    </h2>
                    <div className={styles.modal__actions}>
                        <button
                            onClick={() => copyResult()}
                            className={styles.modal__action}
                        >
                            Share
                        </button>
                        {isCopied && (
                            <span className={styles.modal__copied}>
                                Copied to clipboard
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
