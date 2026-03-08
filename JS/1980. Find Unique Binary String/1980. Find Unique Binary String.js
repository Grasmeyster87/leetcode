/**
 * @param {string[]} nums
 * @return {string}
 */
var findDifferentBinaryString = function(nums) {
    let result = "";
    
    for (let i = 0; i < nums.length; i++) {
        // Беремо i-й символ з i-го рядка
        let currentChar = nums[i][i];
        
        // Додаємо до результату протилежний символ
        // Якщо був '0', додаємо '1', якщо '1' — додаємо '0'
        result += (currentChar === '0' ? '1' : '0');
    }
    
    return result;
};