/**
 * @param {string} word
 * @return {number}
 */
var minimumDistance = function(word) {
    const n = word.length;
    // Мемоїзація: [індекс поточного символу][позиція іншого пальця (0-25 або 26 для null)]
    const memo = Array.from({ length: n }, () => new Array(27).fill(-1));

    // Функція розрахунку координат
    const getCoords = (charIdx) => [Math.floor(charIdx / 6), charIdx % 6];

    // Функція розрахунку відстані між двома символами (літерами)
    const getDist = (c1, c2) => {
        if (c1 === null || c2 === null) return 0;
        const code1 = c1.charCodeAt(0) - 65;
        const code2 = c2.charCodeAt(0) - 65;
        const [r1, l1] = getCoords(code1);
        const [r2, l2] = getCoords(code2);
        return Math.abs(r1 - r2) + Math.abs(l1 - l2);
    };

    const solve = (idx, otherChar) => {
        if (idx === n) return 0;

        // Перетворюємо символ іншого пальця в індекс для мемоїзації
        const otherIdx = otherChar === null ? 26 : otherChar.charCodeAt(0) - 65;
        if (memo[idx][otherIdx] !== -1) return memo[idx][otherIdx];

        const prevChar = word[idx - 1];
        const currentChar = word[idx];

        // Варіант 1: Рухаємо палець, який щойно натиснув попередню літеру (word[idx-1])
        const moveFirst = getDist(prevChar, currentChar) + solve(idx + 1, otherChar);

        // Варіант 2: Рухаємо "інший" палець до поточної літери
        const moveSecond = getDist(otherChar, currentChar) + solve(idx + 1, prevChar);

        return memo[idx][otherIdx] = Math.min(moveFirst, moveSecond);
    };

    // Починаємо з індексу 1, бо перший палець уже на word[0] (ціна 0)
    return solve(1, null);
};