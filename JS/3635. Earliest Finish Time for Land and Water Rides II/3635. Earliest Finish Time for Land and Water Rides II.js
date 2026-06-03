/**
 * @param {number[]} landStartTime
 * @param {number[]} landDuration
 * @param {number[]} waterStartTime
 * @param {number[]} waterDuration
 * @return {number}
 */
var earliestFinishTime = function(landStartTime, landDuration, waterStartTime, waterDuration) {
    let minLF = 2147483647;
    let minWF = 2147483647;

    const n = landStartTime.length;
    for (let i = 0; i < n; i++) {
        const lf = landStartTime[i] + landDuration[i];
        if (lf < minLF) minLF = lf;
    }

    const m = waterStartTime.length;
    for (let i = 0; i < m; i++) {
        const wf = waterStartTime[i] + waterDuration[i];
        if (wf < minWF) minWF = wf;
    }

    let minFinishTime = 2147483647;

    for (let i = 0; i < n; i++) {
        const s = landStartTime[i];
        const finish = (minWF > s ? minWF : s) + landDuration[i];
        if (finish < minFinishTime) minFinishTime = finish;
    }

    for (let i = 0; i < m; i++) {
        const s = waterStartTime[i];
        const finish = (minLF > s ? minLF : s) + waterDuration[i];
        if (finish < minFinishTime) minFinishTime = finish;
    }

    return minFinishTime;
};