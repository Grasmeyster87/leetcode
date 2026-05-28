# Рішення для задачі 3093: Longest Common Suffix Queries

## Стратегія: Suffix Trie (Префіксне дерево для суфіксів)

### 📊 Коротко
- **Часова складність:** O(N·L + Q·L) де N = довжина контейнера, Q = кількість запитів, L = макс. довжина слова
- **Просторова складність:** O(N·L) для зберігання Trie
- **Ключова ідея:** Побудувати дерево суфіксів один раз, потім швидко обробити кожен запит

---

## 🔍 Як це працює

### Крок 1: Створюємо клас TrieNode
```javascript
class TrieNode {
    constructor() {
        this.children = {};        // дочірні вузли
        this.minLenIndex = -1;     // індекс слова з мін. довжиною
    }
}
```
**Пояснення:** Кожен вузол містить:
- `children` - словник для всіх можливих символів (a-z)
- `minLenIndex` - індекс найкоротшого слова, що закінчується на цьому суфіксі

---

### Крок 2: Будуємо Trie для усіх суфіксів `wordsContainer`

```javascript
for (let i = 0; i < wordsContainer.length; i++) {
    const word = wordsContainer[i];
    let node = root;
    
    // Рухаємось від кінця слова до початку
    for (let j = word.length - 1; j >= 0; j--) {
        const char = word[j];
        
        // Створюємо вузол, якщо його ще немає
        if (!node.children[char]) {
            node.children[char] = new TrieNode();
        }
        node = node.children[char];
        
        // Оновлюємо мінімум на цьому вузлі
        if (node.minLenIndex === -1 || 
            word.length < wordsContainer[node.minLenIndex].length ||
            (word.length === wordsContainer[node.minLenIndex].length && 
             i < node.minLenIndex)) {
            node.minLenIndex = i;
        }
    }
    
    // Оновлюємо корінь (порожний суфікс "")
    if (root.minLenIndex === -1 || 
        word.length < wordsContainer[root.minLenIndex].length ||
        (word.length === wordsContainer[root.minLenIndex].length && 
         i < root.minLenIndex)) {
        root.minLenIndex = i;
    }
}
```

**Приклад:** wordsContainer = ["abcd", "bcd", "xbcd"]
```
         root (index=1, len=3)
         /
        'd' (d) -> Node {minLenIndex=1}
        /
       'c' -> Node {minLenIndex=1}
       /
      'b' -> Node {minLenIndex=1}
      /
     'x' -> Node {minLenIndex=2}
     'a' -> Node {minLenIndex=0}
```

**Критерії відбору найменшого індексу:**
1. **Довжина слова** - коротше краще
2. **Індекс** - ранніший краще (при рівній довжині)

---

### Крок 3: Обробляємо запити

```javascript
for (const query of wordsQuery) {
    let node = root;
    
    // Рухаємось від кінця запиту до початку
    for (let j = query.length - 1; j >= 0; j--) {
        const char = query[j];
        
        // Якщо символ не знайдений - зупиняємось
        if (!node.children[char]) {
            break;
        }
        
        // Переходимо на нижчий рівень
        node = node.children[char];
    }
    
    // Додаємо результат (індекс слова з найдовшим суфіксом)
    result.push(node.minLenIndex);
}
```

**Приклад:** wordsQuery = ["cd"]
- Останній символ 'd': знайдено → переходимо до вузла 'd'
- Символ 'c': знайдено → переходимо до вузла 'c'
- Більше символів нема → повертаємо `minLenIndex = 1`

---

## 📈 Трасування Прикладу 1

**Вхід:**
```javascript
wordsContainer = ["abcd", "bcd", "xbcd"]
wordsQuery = ["cd", "bcd", "xyz"]
```

### Побудова Trie:

**Слово 0: "abcd" (len=4)**
```
root.minLenIndex = 0
'd' → Node{minLenIndex: 0}
'c' → Node{minLenIndex: 0}
'b' → Node{minLenIndex: 0}
'a' → Node{minLenIndex: 0}
```

**Слово 1: "bcd" (len=3)** ← коротше, тому оновлюємо
```
root.minLenIndex = 1 (3 < 4)
'd' → Node{minLenIndex: 1}
'c' → Node{minLenIndex: 1}
'b' → Node{minLenIndex: 1}
```

**Слово 2: "xbcd" (len=4)** ← не коротше за "bcd"
```
root.minLenIndex = 1 (залишається)
'd' → Node{minLenIndex: 1}
'c' → Node{minLenIndex: 1}
'b' → Node{minLenIndex: 1}
'x' → Node{minLenIndex: 2}
```

### Обробка запитів:

**Запит 0: "cd"**
- Шукаємо: d → c (обидва знайдені)
- Повертаємо: `node.minLenIndex = 1` ✅

**Запит 1: "bcd"**
- Шукаємо: d → c → b (всі знайдені)
- Повертаємо: `node.minLenIndex = 1` ✅

**Запит 2: "xyz"**
- Шукаємо: z (НЕ знайдено) → зупиняємось на root
- Повертаємо: `root.minLenIndex = 1` ✅

**Результат:** [1, 1, 1] ✅

---

## 📈 Трасування Прикладу 2

**Вхід:**
```javascript
wordsContainer = ["abcdefgh", "poiuygh", "ghghgh"]  // довжини: 8, 7, 6
wordsQuery = ["gh", "acbfgh", "acbfegh"]
```

### Побудова Trie:

Після обробки всіх слів:
- На вузлі 'h' → 'g' (суфікс "gh"): `minLenIndex = 2` (найкоротше: "ghghgh", 6 символів)
- На вузлі 'h' → 'g' → 'f' (суфікс "fgh"): `minLenIndex = 0` (тільки "abcdefgh" має 'f')

### Обробка запитів:

**Запит 0: "gh"**
- Шукаємо: h → g (обидва знайдені)
- На вузлі 'g': `minLenIndex = 2`
- Результат: 2 ✅

**Запит 1: "acbfgh"**
- Шукаємо: h → g → f → b (b НЕ знайдено) → зупиняємось на 'f'
- На вузлі 'f': `minLenIndex = 0` (тільки "abcdefgh")
- Результат: 0 ✅

**Запит 2: "acbfegh"**
- Шукаємо: h → g → e (e НЕ знайдено) → зупиняємось на 'g'
- На вузлі 'g': `minLenIndex = 2`
- Результат: 2 ✅

**Результат:** [2, 0, 2] ✅

---

## 🚀 Порівняння з іншими підходами

### ❌ Наївний підхід (Brute Force)
```javascript
// O(N * Q * L) - ПОВІЛЬНО
for (const query of wordsQuery) {
    let maxLen = -1;
    let result = -1;
    for (let i = 0; i < wordsContainer.length; i++) {
        let commonLen = 0;
        for (let j = 1; j <= Math.min(query.length, wordsContainer[i].length); j++) {
            if (query[query.length - j] === wordsContainer[i][wordsContainer[i].length - j]) {
                commonLen++;
            } else break;
        }
        // оновити результат...
    }
}
```
**Проблема:** Повторний пошук для кожного запиту

### ✅ Наш підхід (Suffix Trie)
```javascript
// O(N*L) побудова + O(Q*L) запити = O(N*L + Q*L) - ШВИДКО!
```
**Переваги:** Побудова один раз, швидкий пошук

---

## 💡 Ключові моменти

| Пункт | Деталь |
|-------|--------|
| **Напрямок обходу** | Від кінця до початку (суфікси) |
| **Оновлення мінімуму** | Перевіряємо довжину, потім індекс |
| **Порожний суфікс** | Завжди оновлюємо корінь (резервне значення) |
| **Невідомі символи** | Зупиняємось і повертаємо поточний `minLenIndex` |

---

## 🎯 Висновок

**Suffix Trie** - оптимальне рішення для цієї задачі:
- ✅ Лінійна часова складність
- ✅ Ефективно для багатьох запитів
- ✅ Автоматичне врахування всіх критеріїв
