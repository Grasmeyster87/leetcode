/**
 * @param {string} s
 * @param {number} minJump
 * @param {number} maxJump
 * @return {boolean}
 */
var canReach = function(s, minJump, maxJump) {
    const n = s.length;
    // 49 — це ASCII-код символу '1'
    if (s.charCodeAt(n - 1) === 49) return false;
    
    // Використовуємо типізований масив Int32Array замість звичайного масиву
    // для максимальної швидкодії (V8 обробляє його значно швидше, без реаллокацій)
    const q = new Int32Array(n);
    let head = 0;
    let tail = 0;
    
    q[tail++] = 0; // Початковий індекс 0
    let furthest = 0; // Найвіддаленіший індекс, який ми вже перевіряли
    
    while (head < tail) {
        let i = q[head++];
        
        let start = i + minJump;
        // Щоб уникнути повторної перевірки одних і тих же елементів
        if (start <= furthest) {
            start = furthest + 1;
        }
        
        let end = i + maxJump;
        if (end >= n) {
            end = n - 1;
        }
        
        for (let j = start; j <= end; j++) {
            // 48 — це ASCII-код символу '0'
            // charCodeAt працює швидше, ніж створення і порівняння нових строк s[j] === '0'
            if (s.charCodeAt(j) === 48) {
                if (j === n - 1) return true;
                q[tail++] = j;
            }
        }
        
        // Оновлюємо максимально перевірену відстань
        furthest = i + maxJump;
    }
    
    return false;
};