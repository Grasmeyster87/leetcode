/**
 * @param {number[][]} coins
 * @return {number}
 */
var maximumAmount = function (coins) {
  const m = coins.length;
  const n = coins[0].length;

  // dp[j][k] зберігає максимальний прибуток для поточного рядка, стовпця j,
  // при використанні рівно k нейтралізацій.
  let dp = new Array(n).fill(null).map(() => [-Infinity, -Infinity, -Infinity]);

  for (let i = 0; i < m; i++) {
    let nextDp = new Array(n).fill(null).map(() => [-Infinity, -Infinity, -Infinity]);

    for (let j = 0; j < n; j++) {
      // Ініціалізація початкової клітинки
      if (i === 0 && j === 0) {
        nextDp[0][0] = coins[0][0];
        // Якщо на старті відразу грабіжник, можемо його нейтралізувати
        if (coins[0][0] < 0) {
          nextDp[0][1] = 0;
        }
        continue;
      }

      for (let k = 0; k <= 2; k++) {
        let prev = -Infinity;

        // Варіанти кроку з попередніх клітинок (зверху або зліва)
        if (i > 0) prev = Math.max(prev, dp[j][k]);
        if (j > 0) prev = Math.max(prev, nextDp[j - 1][k]);

        // Опція 1: Звичайний крок (без нейтралізації у поточній клітинці)
        if (prev !== -Infinity) {
          nextDp[j][k] = Math.max(nextDp[j][k], prev + coins[i][j]);
        }

        // Опція 2: Застосовуємо нейтралізацію, якщо тут грабіжник і є доступні здібності
        if (k > 0 && coins[i][j] < 0) {
          let prevK1 = -Infinity;
          
          // Шукаємо найкращий попередній стан, де було використано (k - 1) здібностей
          if (i > 0) prevK1 = Math.max(prevK1, dp[j][k - 1]);
          if (j > 0) prevK1 = Math.max(prevK1, nextDp[j - 1][k - 1]);

          // Якщо такий шлях існує, додаємо 0 замість від'ємного значення
          if (prevK1 !== -Infinity) {
            nextDp[j][k] = Math.max(nextDp[j][k], prevK1);
          }
        }
      }
    }
    // Переходимо до наступного рядка
    dp = nextDp;
  }

  // Повертаємо максимум серед усіх можливих кількостей використаних нейтралізацій у фінальній точці
  return Math.max(dp[n - 1][0], dp[n - 1][1], dp[n - 1][2]);
};