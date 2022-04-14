const maxNoOfTries = 6;
const maxWordLength = 5;

const handleKeyPress = ({
    tiles,
    setCurrentRow,
    setCurrentColumn,
    key,
    currentRow,
    currentColumn,
}) => {
    if (currentRow === maxNoOfTries - 1 && currentColumn === maxWordLength) {
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

export { handleKeyPress };
