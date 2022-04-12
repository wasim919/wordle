import { useState } from 'react';
import styles from './App.module.scss';
import Keyboard from './components/Keyboard';
import Tiles from './components/Tiles';
import { keyboardKeys } from './datasources/words';

const maxNoOfTries = 6;
const maxWordLength = 5;
export default function App() {
    const [tiles, setTiles] = useState(
        Array.from({ length: maxNoOfTries }, () =>
            Array.from({ length: maxWordLength }, () => null),
        ),
    );
    console.log(keyboardKeys);
    return (
        <div className={styles.container}>
            <Tiles tiles={tiles} />
            <Keyboard />
        </div>
    );
}
