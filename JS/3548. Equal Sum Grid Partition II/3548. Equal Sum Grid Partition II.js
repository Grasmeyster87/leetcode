/**
 * @param {number[][]} grid
 * @return {boolean}
 */
var canPartitionGrid = function (grid) {
    const m = grid.length;
    const n = grid[0].length;

    const rowSums = new Array(m).fill(0);
    const colSums = new Array(n).fill(0);
    let totalSum = 0;

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            let v = grid[r][c];
            rowSums[r] += v;
            colSums[c] += v;
            totalSum += v;
        }
    }

    /**
     * Перевіряє розрізи вздовж першого виміру (dim1).
     * dim1 - кількість скибок (рядків/стовпців), dim2 - довжина скибки.
     */
    function check(dim1, dim2, getSliceSum, getCell) {
        // Частотний словник усіх значень у сітці
        const totalCounts = new Map();
        for (let i = 0; i < dim1; i++) {
            for (let j = 0; j < dim2; j++) {
                let v = getCell(i, j);
                totalCounts.set(v, (totalCounts.get(v) || 0) + 1);
            }
        }

        const s1Counts = new Map();
        let s1 = 0;

        // Пробуємо розріз після i-ї скибки (від 0 до dim1-2)
        for (let i = 0; i < dim1 - 1; i++) {
            s1 += getSliceSum(i);
            // Додаємо значення поточної скибки до статистики першої секції
            for (let j = 0; j < dim2; j++) {
                let v = getCell(i, j);
                s1Counts.set(v, (s1Counts.get(v) || 0) + 1);
            }

            let s2 = totalSum - s1;

            // 1. Пряма рівність
            if (s1 === s2) return true;

            // 2. Спробуємо прибрати елемент із S1, щоб вона стала рівною S2
            if (s1 > s2) {
                let v = s1 - s2;
                if (s1Counts.has(v)) {
                    let h = i + 1,
                        w = dim2;
                    // Перевірка зв'язності:
                    if (h > 1 && w > 1) return true; // Прямокутник
                    if (h === 1 && w > 1) {
                        // Один рядок
                        if (getCell(0, 0) === v || getCell(0, w - 1) === v)
                            return true;
                    } else if (h > 1 && w === 1) {
                        // Один стовпець
                        if (getCell(0, 0) === v || getCell(i, 0) === v)
                            return true;
                    } else if (h === 1 && w === 1) {
                        // Одна клітинка
                        return true;
                    }
                }
            }

            // 3. Спробуємо прибрати елемент із S2
            if (s2 > s1) {
                let v = s2 - s1;
                let countInS2 =
                    (totalCounts.get(v) || 0) - (s1Counts.get(v) || 0);
                if (countInS2 > 0) {
                    let h = dim1 - 1 - i,
                        w = dim2;
                    if (h > 1 && w > 1) return true;
                    if (h === 1 && w > 1) {
                        if (
                            getCell(dim1 - 1, 0) === v ||
                            getCell(dim1 - 1, w - 1) === v
                        )
                            return true;
                    } else if (h > 1 && w === 1) {
                        if (
                            getCell(i + 1, 0) === v ||
                            getCell(dim1 - 1, 0) === v
                        )
                            return true;
                    } else if (h === 1 && w === 1) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    // Перевірка горизонтальних розрізів
    if (
        check(
            m,
            n,
            (i) => rowSums[i],
            (i, j) => grid[i][j],
        )
    )
        return true;

    // Перевірка вертикальних розрізів (міняємо ролями рядки та стовпці)
    if (
        check(
            n,
            m,
            (i) => colSums[i],
            (i, j) => grid[j][i],
        )
    )
        return true;

    return false;
};
