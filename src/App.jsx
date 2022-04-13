import { useEffect, useRef, useState } from 'react';
import styles from './App.module.scss';
import Keyboard from './components/Keyboard';
import Tiles from './components/Tiles';
import { correctWord } from './datasources/words';

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
    const [solved, setSolved] = useState(false);
    const [isRightWay, setIsRightWay] = useState(true);
    const wrongWordRef = useRef(null);

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
            currentColumn === maxWordLength &&
            isPartOfTheWord()
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

    const isPartOfTheWord = () => {
        const userWord = tiles[currentRow].join('');
        if (userWord.toLowerCase() === correctWord.toLowerCase()) {
            setSolved(true);
            return true;
        }
        for (const char of userWord) {
            if (correctWord.toLowerCase().includes(char)) {
                return true;
            }
        }
        setIsRightWay(false);
        return false;
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    });

    const resetIsRightWay = () => {
        setIsRightWay(true);
    };

    useEffect(() => {
        let timerId;
        console.log(isRightWay);
        if (!isRightWay) {
            timerId = setTimeout(resetIsRightWay, 2000);
        }
        return () => {
            if (timerId) {
                clearTimeout(timerId);
            }
        };
    }, [isRightWay]);

    if (solved) {
        return <span>Congratulations, you have solved the game.</span>;
    }
    return (
        <div className={styles.container}>
            <Tiles tiles={tiles} />
            <Keyboard />
            {!isRightWay && (
                <span ref={wrongWordRef} className={styles.notInWordList}>
                    Not in word list
                </span>
            )}
        </div>
    );
}
