/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {boolean}
 */
var areSimilar = function (mat, k) {
    function rotateLeft(row, k) {
        const n = row.length;
        k = ((k % n) + n) % n;
        return row.slice(k).concat(row.slice(0, k));
    }

    function rotateRight(row, k) {
        const n = row.length;
        k = ((k % n) + n) % n;
        return row.slice(-k).concat(row.slice(0, n - k));
    }

    for (let i = 0; i < mat.length; i++) {
        let rotated;
        if (i % 2 === 0) {
            rotated = rotateLeft(mat[i], k);
        } else {
            rotated = rotateRight(mat[i], k);
        }

        // сравниваем построчно
        for (let j = 0; j < mat[i].length; j++) {
            if (rotated[j] !== mat[i][j]) return false;
        }
    }
    return true;
};

// Проверка
console.log(areSimilar([[7,7],[10,10],[4,4]], 2)); // true
console.log(areSimilar([[1,2,3],[4,5,6],[7,8,9]], 4)); // false
console.log(areSimilar([[1,2,1,2],[5,5,5,5],[6,3,6,3]], 2)); // true
console.log(areSimilar([[2,2],[2,2]], 3)); // true

((mat1 = [
    [1, 2, 1, 2],
    [5, 5, 5, 5],
    [6, 3, 6, 3],
]),
    (k1 = 2));
((mat2 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]),
    (k2 = 4));

console.log(areSimilar(mat1, k1)); // true
console.log(areSimilar(mat2, k2)); // false
