/**
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
var canReach = function(arr, start) {
    const n = arr.length;
    const visited = new Uint8Array(n);  // масив відвіданих індексів
    const queue = [start];              // черга BFS
    visited[start] = 1;

    while (queue.length > 0) {
        const i = queue.shift();

        if (arr[i] === 0) return true;  // знайшли індекс зі значенням 0

        // два можливі стрибки: вправо і вліво
        for (const next of [i + arr[i], i - arr[i]]) {
            if (next >= 0 && next < n && !visited[next]) {
                visited[next] = 1;
                queue.push(next);
            }
        }
    }

    return false;  // не вдалося дістатися до індексу зі значенням 0
};