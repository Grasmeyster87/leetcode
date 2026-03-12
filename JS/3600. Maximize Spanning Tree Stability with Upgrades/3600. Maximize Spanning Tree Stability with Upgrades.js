/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} k
 * @return {number}
 */
/*var maxStability = function(n, edges, k) {
    
};
*/
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} k
 * @return {number}
 */
var maxStability = function(n, edges, k) {
    // Допоміжний клас системи непересічних множин (Union-Find)
    class UnionFind {
        constructor(size) {
            this.parent = new Int32Array(size);
            this.rank = new Int32Array(size);
            for (let i = 0; i < size; i++) this.parent[i] = i;
            this.components = size;
        }

        find(i) {
            if (this.parent[i] !== i) {
                this.parent[i] = this.find(this.parent[i]);
            }
            return this.parent[i];
        }

        union(i, j) {
            let rootI = this.find(i);
            let rootJ = this.find(j);
            if (rootI !== rootJ) {
                if (this.rank[rootI] < this.rank[rootJ]) {
                    this.parent[rootI] = rootJ;
                } else if (this.rank[rootI] > this.rank[rootJ]) {
                    this.parent[rootJ] = rootI;
                } else {
                    this.parent[rootJ] = rootI;
                    this.rank[rootI]++;
                }
                this.components--;
                return true; // Об'єднання пройшло успішно (ребро з'єднало дві компоненти)
            }
            return false; // Ребро утворює цикл (вершини вже були з'єднані)
        }
    }

    // 1. Попередня перевірка чи взагалі можливо побудувати остовне дерево
    let ufValid = new UnionFind(n);
    
    // Перевірка на обов'язкові ребра: якщо вони створюють цикл - дерево неможливе (Example 3)
    for (let i = 0; i < edges.length; i++) {
        let [u, v, s, must] = edges[i];
        if (must === 1) {
            if (!ufValid.union(u, v)) return -1;
        }
    }
    
    // Перевірка, чи граф у принципі зв'язний
    for (let i = 0; i < edges.length; i++) {
        let [u, v, s, must] = edges[i];
        if (must === 0) {
            ufValid.union(u, v);
        }
    }
    if (ufValid.components > 1) return -1;

    // 2. Бінарний пошук для максимізації мінімальної міцності
    // Максимально можлива сила ребра до апгрейду 100 000. Після: 200 000.
    let low = 1, high = 200000;
    let maxStability = -1;

    function check(target) {
        let uf = new UnionFind(n);
        let upgradesUsed = 0;

        // Крок 1: Додаємо всі обов'язкові ребра
        for (let i = 0; i < edges.length; i++) {
            let [u, v, s, must] = edges[i];
            if (must === 1) {
                if (s < target) return false; // Якщо сила < target, цей target неможливий
                uf.union(u, v);
            }
        }

        // Крок 2: Додаємо необов'язкові ребра, яким НЕ ПОТРІБЕН апгрейд
        for (let i = 0; i < edges.length; i++) {
            let [u, v, s, must] = edges[i];
            if (must === 0 && s >= target) {
                uf.union(u, v);
            }
        }

        // Крок 3: Додаємо необов'язкові ребра, яким ПОТРІБЕН апгрейд (це буде коштувати 1 ліміт k)
        for (let i = 0; i < edges.length; i++) {
            let [u, v, s, must] = edges[i];
            if (must === 0 && s < target && s * 2 >= target) {
                if (uf.union(u, v)) {
                    upgradesUsed++; // Якщо ребро з'єднало компоненти, ми використали 1 апгрейд
                }
            }
        }

        // Граф зв'язний && витратили не більше ніж k покращень
        return uf.components === 1 && upgradesUsed <= k;
    }

    // 3. Сам процес бінарного пошуку
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (check(mid)) {
            maxStability = mid;
            low = mid + 1; // Шукаємо кращий/більший мінімум
        } else {
            high = mid - 1; // Мінімальна межа недосяжна, зменшуємо гіпотезу
        }
    }

    return maxStability;
};