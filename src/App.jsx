import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Analytics from './components/Analytics';
import Keyboard from './components/Keyboard';
import Tiles from './components/Tiles';
import { wordList } from './core/constants';
import { copyResultToClipboard } from './core/utils';
import useKeyPress from './hooks/useKeyPress';
import useLocalStorage from './hooks/useLocalStorage';

const correctWord = wordList[Math.floor(Math.random() * wordList.length) + 0];
export default function App() {
    const [isCopied, setIsCopied] = useState(false);
    const [tiles, solved, showModal, isRightWay, userSolution, setShowModal] =
        useKeyPress(correctWord);
    const [lsItem] = useLocalStorage('score');
    const [lsTries] = useLocalStorage('tries');

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
                <span
                    onClick={() => window.location.reload()}
                    className={styles.header__restart}
                >
                    Restart
                </span>
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
            <Analytics score={lsItem} tries={lsTries} />
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
