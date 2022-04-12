import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Keyboard from './components/Keyboard';
import Tiles from './components/Tiles';

function isCharacterALetter(char) {
    if (char === 'Enter' || char === 'Backspace' || char.length > 1) {
        return false;
    }
    return char.match(/[a-z]/i);
}
const maxNoOfTries = 6;
const maxWordLength = 5;
export default function App() {
    const [tiles, setTiles] = useState(
        Array.from({ length: maxNoOfTries }, () =>
            Array.from({ length: maxWordLength }, () => null),
        ),
    );
    const [currentRow, setCurrentRow] = useState(0);
    const [currentColumn, setCurrentColumn] = useState(0);

    const handleKeyPress = (key) => {
        console.log(currentRow, currentColumn);
        if (
            currentRow === maxNoOfTries - 1 &&
            currentColumn === maxWordLength
        ) {
            window.alert('No more tries allowed for today!');
            return;
        }
        let _key = key.key;
        let _tiles = [...tiles];
        if (
            _key === 'Enter' &&
            currentRow < maxNoOfTries &&
            currentColumn === maxWordLength
        ) {
            setCurrentRow(currentRow + 1);
            setCurrentColumn(0);
        } else if (_key === 'Backspace' && currentColumn >= 0) {
            let _currentColumn = currentColumn;
            _currentColumn--;

            if (!_tiles[currentRow][_currentColumn]) {
                return;
            }

            _tiles[currentRow][_currentColumn] = null;

            setCurrentColumn(_currentColumn);
        } else if (isCharacterALetter(_key) && currentColumn < maxWordLength) {
            _tiles[currentRow][currentColumn] = _key;
            setCurrentColumn(currentColumn + 1);
        }

        setTiles(_tiles);
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    });

    return (
        <div className={styles.container}>
            <Tiles tiles={tiles} />
            <Keyboard />
        </div>
    );
}
