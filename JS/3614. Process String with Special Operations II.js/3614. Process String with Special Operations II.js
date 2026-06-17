/**
 * @param {string} s
 * @param {number} k
 * @return {character}
 */
var processStr = function(s, k) {
    const n = s.length;
    const CAP = 2e15;
    
    // Forward pass — тільки Number, без BigInt
    const lens = new Float64Array(n); // Float64Array швидший за звичайний Array
    let len = 0;
    
    for (let i = 0; i < n; i++) {
        const c = s.charCodeAt(i); // charCodeAt швидший за s[i]
        if (c === 42) {            // '*'
            if (len > 0) len--;
        } else if (c === 35) {     // '#'
            len *= 2;
            if (len > CAP) len = CAP;
        } else if (c !== 37) {     // не '%' → літера
            len++;
        }
        // '%' — довжина не змінюється
        lens[i] = len;
    }
    
    const finalLen = lens[n - 1];
    if (k >= finalLen) return '.';
    
    // Backward pass — працюємо з Number поки можливо
    let kk = k; // k <= 1e15, безпечно як float64
    
    for (let i = n - 1; i >= 0; i--) {
        const c = s.charCodeAt(i);
        const prevLen = i > 0 ? lens[i - 1] : 0;
        
        if (c === 35) {          // '#'
            if (kk >= prevLen) kk -= prevLen;
            // curLen не треба відслідковувати — беремо з lens[i-1]
        } else if (c === 37) {   // '%'
            kk = lens[i] - 1 - kk;
        } else if (c !== 42) {   // літера
            if (kk === prevLen) return s[i];
        }
        // '*' — нічого не робимо з kk
    }
    
    return '.';
};