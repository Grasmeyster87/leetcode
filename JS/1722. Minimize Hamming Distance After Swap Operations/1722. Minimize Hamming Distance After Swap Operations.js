/**
 * Клас для роботи зі зв'язними компонентами (Disjoint Set Union)
 */
class UnionFind {
    constructor(size) {
        this.parent = Array.from({ length: size }, (_, i) => i);
        this.rank = new Array(size).fill(0);
    }

    // Знайти корінь компоненти з оптимізацією стиснення шляху
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    // Об'єднати дві компоненти
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX !== rootY) {
            if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
        }
    }
}

/**
 * @param {number[]} source
 * @param {number[]} target
 * @param {number[][]} allowedSwaps
 * @return {number}
 */
var minimumHammingDistance = function(source, target, allowedSwaps) {
    const n = source.length;
    const dsu = new UnionFind(n);

    // 1. Об'єднуємо всі дозволені індекси у зв'язні компоненти
    for (const [u, v] of allowedSwaps) {
        dsu.union(u, v);
    }

    // 2. Рахуємо частоту елементів source для кожної компоненти
    // Формат: { корінь_компоненти: Map(значення -> кількість) }
    const componentMap = new Map();

    for (let i = 0; i < n; i++) {
        const root = dsu.find(i);
        if (!componentMap.has(root)) {
            componentMap.set(root, new Map());
        }
        
        const countMap = componentMap.get(root);
        const val = source[i];
        countMap.set(val, (countMap.get(val) || 0) + 1);
    }

    let distance = 0;

    // 3. Проходимо по target і перевіряємо, чи можемо ми знайти потрібний елемент
    for (let i = 0; i < n; i++) {
        const root = dsu.find(i);
        const countMap = componentMap.get(root);
        const targetVal = target[i];

        // Якщо в нашій компоненті є потрібне число з target, використовуємо його
        if (countMap.has(targetVal) && countMap.get(targetVal) > 0) {
            countMap.set(targetVal, countMap.get(targetVal) - 1);
        } else {
            // Якщо числа немає або вони закінчилися, це розбіжність
            distance++;
        }
    }

    return distance;
};