import styles from './App.module.scss';
import Keyboard from './components/Keyboard';
import Tiles from './components/Tiles';
import useKeyPress from './hooks/useKeyPress';

export default function App() {
    const [tiles, solved, isRightWay] = useKeyPress();

    return (
        <div className={styles.container}>
            <Tiles tiles={tiles} />
            <Keyboard />
            {!isRightWay && (
                <span className={styles.notInWordList}>Not in word list</span>
            )}
            {solved && (
                <span className={styles.solved}>
                    Congratulations! you have solved the game.
                </span>
            )}
        </div>
    );
}
