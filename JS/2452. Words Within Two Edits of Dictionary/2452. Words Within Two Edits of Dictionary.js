/**
 * @param {string[]} queries
 * @param {string[]} dictionary
 * @return {string[]}
 */
var twoEditWords = function (queries, dictionary) {
    const result = [];
    
    // Перебираємо кожне слово із запитів
    for (let i = 0; i < queries.length; i++) {
        const query = queries[i];
        
        // Перебираємо кожне слово зі словника
        for (let j = 0; j < dictionary.length; j++) {
            const dictWord = dictionary[j];
            let diffCount = 0;
            
            // Посимвольне порівняння двох слів
            for (let k = 0; k < query.length; k++) {
                if (query[k] !== dictWord[k]) {
                    diffCount++;
                }
                
                // Оптимізація раннього виходу: 
                // якщо розбіжностей вже більше 2, перериваємо перевірку цього слова
                if (diffCount > 2) {
                    break;
                }
            }
            
            // Якщо знайшли слово, яке відрізняється не більше ніж на 2 символи
            if (diffCount <= 2) {
                result.push(query);
                // Оскільки слово з queries вже підійшло, шукати інші збіги у словнику не потрібно
                break; 
            }
        }
    }
    
    return result;
};