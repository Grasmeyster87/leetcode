/**
 * @param {string[]} wordsContainer
 * @param {string[]} wordsQuery
 * @return {number[]}
 */
var stringIndices = function (wordsContainer, wordsQuery) {
    class TrieNode {
        constructor() {
            this.children = {};
            this.minLenIndex = -1; // індекс слова з мін. довжиною на цьому вузлі
        }
    }

    const root = new TrieNode();

    // Будуємо Trie для суфіксів wordsContainer
    for (let i = 0; i < wordsContainer.length; i++) {
        const word = wordsContainer[i];
        let node = root;

        // Вставляємо все суфікси (рухаємось з кінця слова)
        for (let j = word.length - 1; j >= 0; j--) {
            const char = word[j];
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];

            // Оновлюємо найменший індекс на цьому рівні
            if (
                node.minLenIndex === -1 ||
                word.length < wordsContainer[node.minLenIndex].length ||
                (word.length === wordsContainer[node.minLenIndex].length &&
                    i < node.minLenIndex)
            ) {
                node.minLenIndex = i;
            }
        }

        // Оновлюємо корінь (для порожнього суфіксу)
        if (
            root.minLenIndex === -1 ||
            word.length < wordsContainer[root.minLenIndex].length ||
            (word.length === wordsContainer[root.minLenIndex].length &&
                i < root.minLenIndex)
        ) {
            root.minLenIndex = i;
        }
    }

    const result = [];

    // Обробляємо кожний запит
    for (const query of wordsQuery) {
        let node = root;

        // Шукаємо найдовший суфікс, який збігається
        for (let j = query.length - 1; j >= 0; j--) {
            const char = query[j];
            if (!node.children[char]) {
                break;
            }
            node = node.children[char];
        }

        result.push(node.minLenIndex);
    }

    return result;
};
