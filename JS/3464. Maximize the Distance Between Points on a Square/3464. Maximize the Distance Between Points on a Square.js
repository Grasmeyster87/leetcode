/**
 * @param {number} side
 * @param {number[][]} points
 * @param {number} k
 * @return {number}
 */
var maxDistance = function(side, points, k) {
    const n = points.length;
    // Використовуємо Float64Array для оптимізації та уникнення переповнення 
    // (JavaScript Number підтримує точність до 9*10^15, що з запасом покриває 4*10^9)
    const A = new Float64Array(n);
    
    // 1. Перетворення 2D координат у 1D відстань вздовж периметра
    for (let i = 0; i < n; i++) {
        const x = points[i][0];
        const y = points[i][1];
        
        if (y === 0) {
            A[i] = x;                       // Нижній край
        } else if (x === side) {
            A[i] = side + y;                // Правий край
        } else if (y === side) {
            A[i] = 3 * side - x;            // Верхній край
        } else {
            A[i] = 4 * side - y;            // Лівий край
        }
    }
    
    // Float64Array за замовчуванням сортує числа правильно (числове сортування, а не строкове)
    A.sort(); 
    
    const doubleA = new Float64Array(2 * n);
    const perimeter = 4 * side;
    
    // Дублюємо масив для циклічності
    for (let i = 0; i < n; i++) {
        doubleA[i] = A[i];
        doubleA[i + n] = A[i] + perimeter;
    }
    
    const nextIdx = new Int32Array(2 * n);
    
    // Функція для перевірки, чи можливо розставити k точок на відстані >= D
    function check(D) {
        let j = 0;
        // Метод двох вказівників для попереднього обчислення наступних "стрибків"
        for (let i = 0; i < 2 * n; i++) {
            while (j < 2 * n && doubleA[j] - doubleA[i] < D) {
                j++;
            }
            nextIdx[i] = j;
        }
        
        // Шукаємо валідне вікно серед n можливих початкових точок
        for (let i = 0; i < n; i++) {
            let curr = i;
            let valid = true;
            
            // Робимо (k - 1) стрибків
            for (let step = 1; step < k; step++) {
                curr = nextIdx[curr];
                if (curr >= 2 * n) {
                    valid = false;
                    break;
                }
            }
            
            // Перевіряємо відстань "замикання" між останньою і початковою точкою
            if (valid && doubleA[curr] - doubleA[i] <= perimeter - D) {
                return true;
            }
        }
        
        return false;
    }
    
    // Бінарний пошук відповіді
    let low = 1;
    let high = side; 
    let ans = 0;
    
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        
        if (check(mid)) {
            ans = mid;
            low = mid + 1; // Пробуємо збільшити дистанцію
        } else {
            high = mid - 1; // Зменшуємо цільову дистанцію
        }
    }
    
    return ans;
};