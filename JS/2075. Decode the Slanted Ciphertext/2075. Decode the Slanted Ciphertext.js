/**
 * @param {string} encodedText
 * @param {number} rows
 * @return {string}
 */
var decodeCiphertext = function (encodedText, rows) {
    if (!encodedText || rows === 1) {
        return encodedText.trimEnd();
    }

    const cols = getColumnsCount(encodedText.length, rows);
    const decodedChars = extractDiagonalCharacters(encodedText, rows, cols);

    return decodedChars.join('').trimEnd();
};

/**
 * Обчислює кількість стовпців у матриці.
 * @param {number} textLength - Довжина закодованого рядка
 * @param {number} rows - Кількість рядків
 * @return {number}
 */
function getColumnsCount(textLength, rows) {
    return Math.floor(textLength / rows);
}

/**
 * Витягує символи по діагоналі згідно з алгоритмом Slanted Ciphertext.
 * @param {string} text - Закодований текст
 * @param {number} rows - Кількість рядків
 * @param {number} cols - Кількість стовпців
 * @return {string[]} Масив розшифрованих символів
 */
function extractDiagonalCharacters(text, rows, cols) {
    const result = [];
    // У 1D масиві перехід на наступний елемент діагоналі (вниз і вправо)
    // дорівнює зсуву на довжину одного рядка (cols) плюс 1 позиція вправо.
    const step = cols + 1;

    for (let startCol = 0; startCol < cols; startCol++) {
        // Рухаємось по діагоналі, поки не вийдемо за межі стовпців або рядків
        for (
            let idx = startCol, row = 0;
            row < rows && startCol + row < cols;
            idx += step, row++
        ) {
            result.push(text[idx]);
        }
    }

    return result;
}
