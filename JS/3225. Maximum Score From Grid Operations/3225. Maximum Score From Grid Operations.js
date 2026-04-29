/**
 * 3225. Maximum Score From Grid Operations
 *
 * Підхід: Dynamic Programming з Prefix Sums
 * Складність: O(n³) за часом, O(n²) за пам'яттю
 *
 * Ідея: кожен стовпець має "висоту" чорних клітин (від верху вниз).
 * Для кожного стовпця j відстежуємо два стани:
 * - prevPick[i]: макс. бал якщо стовпець j-1 було "обрано" (має чорні клітини
 *   до рядка i-1)
 * - prevSkip[i]: макс. бал якщо стовпець j-1 було "пропущено", а останній
 *   обраний стовпець мав чорні клітини до рядка i-1
 *
 * @param {number[][]} grid
 * @return {number}
 */
var maximumScore = function (grid) {
    const n = grid.length;

    // prefix[j][i] — сума перших i елементів у стовпці j
    const prefix = Array.from({ length: n }, () => new Array(n + 1).fill(0));

    for (let j = 0; j < n; j++) {
        for (let i = 0; i < n; i++) {
            prefix[j][i + 1] = prefix[j][i] + grid[i][j];
        }
    }

    // prevPick[i] — макс. бал до попереднього стовпця, де найнижча
    // обрана (чорна) клітина в тому стовпці знаходиться в рядку (i - 1)
    let prevPick = new Array(n + 1).fill(0);

    // prevSkip[i] — макс. бал до попереднього стовпця, де найнижча
    // обрана клітина в стовпці перед попереднім знаходиться в рядку (i - 1)
    let prevSkip = new Array(n + 1).fill(0);

    for (let j = 1; j < n; j++) {
        const currPick = new Array(n + 1).fill(0);
        const currSkip = new Array(n + 1).fill(0);

        for (let curr = 0; curr <= n; curr++) {
            for (let prev = 0; prev <= n; prev++) {
                if (curr > prev) {
                    // Випадок 1: поточний стовпець глибше за попередній.
                    // Збираємо бали grid[prev..curr) зі стовпця j-1
                    // (ці клітини білі в j-1, але суміжні з чорними в j)
                    const score = prefix[j - 1][curr] - prefix[j - 1][prev];
                    currPick[curr] = Math.max(
                        currPick[curr],
                        prevSkip[prev] + score
                    );
                    currSkip[curr] = Math.max(
                        currSkip[curr],
                        prevSkip[prev] + score
                    );
                } else {
                    // Випадок 2: попередній стовпець глибше за поточний.
                    // Збираємо бали grid[curr..prev) зі стовпця j
                    // (ці клітини білі в j, але суміжні з чорними в j-1)
                    const score = prefix[j][prev] - prefix[j][curr];
                    currPick[curr] = Math.max(
                        currPick[curr],
                        prevPick[prev] + score
                    );
                    currSkip[curr] = Math.max(
                        currSkip[curr],
                        prevPick[prev]
                    );
                }
            }
        }

        prevPick = currPick;
        prevSkip = currSkip;
    }

    return Math.max(...prevPick);
};
