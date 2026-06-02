/**
 * @param {number[]} landStartTime
 * @param {number[]} landDuration
 * @param {number[]} waterStartTime
 * @param {number[]} waterDuration
 * @return {number}
 */
var earliestFinishTime = function(landStartTime, landDuration, waterStartTime, waterDuration) {
    const n = landStartTime.length;
    const m = waterStartTime.length;

    let minLF = Infinity;
    for (let i = 0; i < n; i++) {
        const lf = landStartTime[i] + landDuration[i];
        if (lf < minLF) minLF = lf;
    }

    let minWF = Infinity;
    for (let j = 0; j < m; j++) {
        const wf = waterStartTime[j] + waterDuration[j];
        if (wf < minWF) minWF = wf;
    }

    let minFinishTime = Infinity;

    // Варіант 1: Спочатку наземний атракціон, потім водний
    for (let j = 0; j < m; j++) {
        const finish = Math.max(minLF, waterStartTime[j]) + waterDuration[j];
        if (finish < minFinishTime) minFinishTime = finish;
    }

    // Варіант 2: Спочатку водний атракціон, потім наземний
    for (let i = 0; i < n; i++) {
        const finish = Math.max(minWF, landStartTime[i]) + landDuration[i];
        if (finish < minFinishTime) minFinishTime = finish;
    }

    return minFinishTime;
};