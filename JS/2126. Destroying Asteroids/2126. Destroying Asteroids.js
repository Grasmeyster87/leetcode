/**
 * @param {number} mass
 * @param {number[]} asteroids
 * @return {boolean}
 */
var asteroidsDestroyed = function(mass, asteroids) {
    let maxA = 0;
    for (let i = 0; i < asteroids.length; i++) {
        if (asteroids[i] > maxA) maxA = asteroids[i];
    }
    
    if (mass >= maxA) return true;
    
    const counts = new Uint32Array(maxA + 1);
    for (let i = 0; i < asteroids.length; i++) {
        counts[asteroids[i]]++;
    }
    
    for (let v = 1; v <= maxA; v++) {
        if (counts[v] > 0) {
            if (mass < v) return false;
            mass += v * counts[v];
            if (mass >= maxA) return true;
        }
    }
    
    return true;
};
