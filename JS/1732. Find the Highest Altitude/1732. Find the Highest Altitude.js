/**
 * @param {number[]} gain
 * @return {number}
 */
var largestAltitude = function(gain) {
    let altitude = 0;       // текущая высота
    let maxAltitude = 0;    // максимальная высота

    for (let i = 0; i < gain.length; i++) {
        altitude += gain[i];           // прибавляем изменение
        maxAltitude = Math.max(maxAltitude, altitude); // обновляем максимум
    }

    return maxAltitude;
};

gain = [-5,1,5,0,-7]
console.log (largestAltitude (gain)) // 1