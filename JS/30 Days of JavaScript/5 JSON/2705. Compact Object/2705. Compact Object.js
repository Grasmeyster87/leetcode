/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function (obj) {
    // Базовий випадок: якщо це не об'єкт (число, рядок, булеве значення) або null
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // Якщо масив: фільтруємо елементи та рекурсивно очищуємо кожен з них
    if (Array.isArray(obj)) {
        const compactedArray = [];
        for (let i = 0; i < obj.length; i++) {
            const val = compactObject(obj[i]);
            if (Boolean(val)) {
                compactedArray.push(val);
            }
        }
        return compactedArray;
    }

    // Якщо об'єкт: створюємо новий об'єкт лише з "істинними" значеннями
    const compactedObj = {};
    for (const key in obj) {
        const val = compactObject(obj[key]);
        if (Boolean(val)) {
            compactedObj[key] = val;
        }
    }
    return compactedObj;
};
