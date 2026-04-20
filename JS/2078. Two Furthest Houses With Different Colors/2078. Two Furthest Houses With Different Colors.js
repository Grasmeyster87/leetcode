/**
 * @param {number[]} colors
 * @return {number}
 */
var maxDistance = function(colors) {
    const n = colors.length;
    let maxDist = 0;

    // Перевіряємо максимальну відстань від першого будинку (colors[0])
    for (let i = n - 1; i >= 0; i--) {
        if (colors[i] !== colors[0]) {
            maxDist = Math.max(maxDist, i);
            break; 
        }
    }

    // Перевіряємо максимальну відстань від останнього будинку (colors[n-1])
    for (let i = 0; i < n; i++) {
        if (colors[i] !== colors[n - 1]) {
            maxDist = Math.max(maxDist, n - 1 - i);
            break;
        }
    }

    return maxDist;
};