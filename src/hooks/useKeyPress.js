import { useEffect, useState } from 'react';
import { correctWord, keyboardKeys } from '../datasources/words';

const maxNoOfTries = 6;
const maxWordLength = 5;

function isCharacterALetter(char) {
    if (char === 'Enter' || char === 'Backspace' || char.length > 1) {
        return false;
    }
    return char.match(/[a-z]/i);
}

const useKeyPress = () => {
    const [tiles, setTiles] = useState(
        Array.from({ length: maxNoOfTries }, () =>
            Array.from({ length: maxWordLength }, () => null),
        ),
    );
    const [currentRow, setCurrentRow] = useState(0);
    const [currentColumn, setCurrentColumn] = useState(0);
    const [solved, setSolved] = useState(false);
    const [isRightWay, setIsRightWay] = useState(true);

    const handleKeyPress = (key) => {
        if (solved) {
            return;
        }
        if (currentRow === maxNoOfTries && currentColumn === maxWordLength) {
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
        const _correctWord = correctWord.toLowerCase();
        if (userWord.toLowerCase() === _correctWord) {
            setSolved(true);
        }
        let isPresent = false;
        let visited = new Map();
        for (let i = 0; i < userWord.length; ++i) {
            const char = userWord[i];
            const element = document.getElementById(`${currentRow}${i}`);
            const keyButton =
                document.querySelectorAll('#keyboard button')[
                    keyboardKeys.flat().indexOf(char)
                ];

            if (_correctWord.includes(char) && !visited.get(char)) {
                visited.set(char, true);
                const correctIndex = _correctWord.indexOf(char);
                if (!isPresent) {
                    isPresent = true;
                }
                if (correctIndex === i) {
                    element.style = 'background-color: #538d4e';
                    keyButton.style = 'background-color: #538d4e';
                } else {
                    element.style = 'background-color: #b59f3b';
                    keyButton.style = 'background-color: #b59f3b';
                }
            } else if (!_correctWord.includes(char) || visited.get(char)) {
                element.style = 'background-color: #3a3a3c';
                if (!visited.get(char)) {
                    keyButton.style = 'background-color: #3a3a3c';
                }
            }
        }
        setIsRightWay(isPresent);
        return isPresent;
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
        if (!isRightWay) {
            timerId = setTimeout(resetIsRightWay, 2000);
        }
        return () => {
            if (timerId) {
                clearTimeout(timerId);
            }
        };
    }, [isRightWay]);

    return [tiles, solved, isRightWay];
};

export default useKeyPress;
