/**
 * @param {number[]} arr
 * @return {number}
 */
var minJumps = function(arr) {
    const n = arr.length;
    if (n === 1) return 0;

    // Будуємо Map: значення -> список індексів
    const graph = new Map();
    for (let i = 0; i < n; i++) {
        if (!graph.has(arr[i])) graph.set(arr[i], []);
        graph.get(arr[i]).push(i);
    }

    // BFS
    const visited = new Array(n).fill(false);
    const queue = [0];
    visited[0] = true;
    let steps = 0;

    while (queue.length > 0) {
        const size = queue.length;
        const nextQueue = [];

        for (let q = 0; q < size; q++) {
            const i = queue[q];
            if (i === n - 1) return steps;

            // Перехід до сусідів з тим самим значенням
            if (graph.has(arr[i])) {
                for (const j of graph.get(arr[i])) {
                    if (!visited[j]) {
                        visited[j] = true;
                        nextQueue.push(j);
                    }
                }
                // Видаляємо групу, щоб не обходити повторно — ключ до O(n)
                graph.delete(arr[i]);
            }

            // Перехід i + 1
            if (i + 1 < n && !visited[i + 1]) {
                visited[i + 1] = true;
                nextQueue.push(i + 1);
            }

            // Перехід i - 1
            if (i - 1 >= 0 && !visited[i - 1]) {
                visited[i - 1] = true;
                nextQueue.push(i - 1);
            }
        }

        queue.length = 0;
        queue.push(...nextQueue);
        steps++;
    }

    return -1;
};