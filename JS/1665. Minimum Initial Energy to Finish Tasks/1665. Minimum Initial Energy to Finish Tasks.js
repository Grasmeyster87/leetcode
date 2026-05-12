/**
 * @param {number[][]} tasks
 * @return {number}
 */
var minimumEffort = function(tasks) {
    tasks.sort((a, b) => (a[1] - a[0]) - (b[1] - b[0]));

    let energy = 0;

    for (let i = 0; i < tasks.length; i++) {
        energy = Math.max(energy + tasks[i][0], tasks[i][1]);
    }

    return energy;
};