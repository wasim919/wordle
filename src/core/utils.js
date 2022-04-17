function isAlphabet(char) {
    if (char === 'Enter' || char === 'Backspace' || char.length > 1) {
        return false;
    }
    return char.match(/[a-z]/i);
}

function getCharCountMap(word) {
    let countMap = new Map();
    for (const char of word) {
        if (countMap.has(char)) {
            countMap.set(char, countMap.get(char) + 1);
        } else {
            countMap.set(char, 1);
        }
    }
    return countMap;
}

function copyResultToClipboard(userSolution) {
    let string = '';
    let breakLoop = false;
    for (let i = 0; i < userSolution.length; ++i) {
        for (let j = 0; j < userSolution[i].length; ++j) {
            if (userSolution[i][j] === -1) {
                string += '⬛';
            } else if (userSolution[i][j] === 0) {
                string += '🟨';
            } else if (userSolution[i][j] === 1) {
                string += '🟩';
            } else {
                breakLoop = true;
                break;
            }
        }
        if (breakLoop) {
            break;
        }
        string += '\n';
    }
    navigator.clipboard.writeText(string.trim());
}

export { isAlphabet, getCharCountMap, copyResultToClipboard };
