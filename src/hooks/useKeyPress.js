import { useEffect, useState } from 'react';
import {
    copyResultToClipboard,
    getCharCountMap,
    isAlphabet,
} from '../core/utils';
import { keyboardKeys } from '../datasources/words';

const maxNoOfTries = 6;
const maxWordLength = 5;

const useKeyPress = (correctWord) => {
    const [tiles, setTiles] = useState(
        Array.from({ length: maxNoOfTries }, () =>
            Array.from({ length: maxWordLength }, () => null),
        ),
    );
    const [currentRow, setCurrentRow] = useState(0);
    const [currentColumn, setCurrentColumn] = useState(0);
    const [solved, setSolved] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isRightWay, setIsRightWay] = useState(true);
    const [userSolution, setUserSolution] = useState(
        Array.from({ length: maxNoOfTries }, () =>
            Array.from({ length: maxWordLength }, () => -2),
        ),
    );

    const correctWordCharCount = getCharCountMap(correctWord.toLowerCase());

    const handleKeyPress = (key) => {
        if (solved) {
            return;
        }

        let _key = key.key;
        if (
            currentRow === maxNoOfTries - 1 &&
            currentColumn === maxWordLength &&
            _key !== 'Enter'
        ) {
            window.alert('No more tries allowed for today!');
            return;
        }
        let _tiles = [...tiles];
        if (
            _key === 'Enter' &&
            currentRow < maxNoOfTries &&
            currentColumn === maxWordLength &&
            charIsPresentInCorrectWord()
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
        } else if (isAlphabet(_key) && currentColumn < maxWordLength) {
            _tiles[currentRow][currentColumn] = _key;
            setCurrentColumn(currentColumn + 1);
        }

        setTiles(_tiles);
    };

    const colorTileAndKey = (tile, key, color) => {
        tile.style = `background-color: ${color}`;
        key.style = `background-color: ${color}`;
    };

    const charIsPresentInCorrectWord = () => {
        const userWord = tiles[currentRow].join('').toLowerCase();
        const _correctWord = correctWord.toLowerCase();

        let isPresent = false;
        let currentWordCharCount = new Map();
        for (const char of userWord) {
            currentWordCharCount.set(char, 1);
        }
        const _userSolution = [...userSolution];
        for (let i = 0; i < userWord.length; ++i) {
            const char = userWord[i];
            const tileEl = document.getElementById(`${currentRow}${i}`);
            const keyButtonEl =
                document.querySelectorAll('#keyboard button')[
                    keyboardKeys.flat().indexOf(char)
                ];
            if (
                _correctWord.includes(char) &&
                currentWordCharCount.get(char) <= correctWordCharCount.get(char)
            ) {
                const correctIndex = _correctWord.indexOf(char);
                if (!isPresent) {
                    isPresent = true;
                }
                if (correctIndex === i || correctWordCharCount.get(char) > 1) {
                    colorTileAndKey(tileEl, keyButtonEl, '#538d4e');
                    _userSolution[currentRow][i] = 1;
                } else {
                    colorTileAndKey(tileEl, keyButtonEl, '#b59f3b');
                    _userSolution[currentRow][i] = 0;
                }
            } else if (
                !_correctWord.includes(char) ||
                currentWordCharCount.get(char) > correctWordCharCount.get(char)
            ) {
                tileEl.style = 'background-color: #3a3a3c';
                keyButtonEl.style = 'background-color: #3a3a3c';
                _userSolution[currentRow][i] = -1;
            }
            if (currentWordCharCount.has(char)) {
                currentWordCharCount.set(
                    char,
                    currentWordCharCount.get(char) + 1,
                );
            } else {
                currentWordCharCount.set(char, 1);
            }
        }
        setIsRightWay(isPresent);
        setUserSolution(_userSolution);
        if (userWord === _correctWord) {
            setSolved(true);
            setShowModal(true);
            copyResultToClipboard(_userSolution);
        }
        return isPresent;
    };

    const resetIsRightWay = () => {
        setIsRightWay(true);
        setSolved(false);
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    });

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

    return [tiles, solved, showModal, isRightWay, userSolution, setShowModal];
};

export default useKeyPress;
