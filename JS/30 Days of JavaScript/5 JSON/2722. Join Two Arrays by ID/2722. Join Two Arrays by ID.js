/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function (arr1, arr2) {
    // Створюємо Map для збереження об'єктів за їхнім id
    const map = new Map();

    // Додаємо всі об'єкти з arr1 у Map
    for (const obj of arr1) {
        map.set(obj.id, obj);
    }

    // Додаємо всі об'єкти з arr2 у Map
    // Якщо id вже існує, об'єднуємо властивості
    for (const obj of arr2) {
        if (map.has(obj.id)) {
            // Об'єднуємо об'єкти: властивості з arr2 перекривають arr1
            map.set(obj.id, { ...map.get(obj.id), ...obj });
        } else {
            map.set(obj.id, obj);
        }
    }

    // Перетворюємо Map у масив
    const joinedArray = Array.from(map.values());

    // Сортуємо масив за id у зростаючому порядку
    joinedArray.sort((a, b) => a.id - b.id);

    return joinedArray;
};
