/**
 * @param {number[]} nums
 * @param {number} pivot
 * @return {number[]}
 */
var pivotArray = function (nums, pivot) {
    let arr = new Int16Array(nums.length);
    let k = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < pivot) arr[k++] = nums[i];        
    }

    for (let c = 0; c < nums.length; c++) {
        if (nums[c] == pivot) arr[k++] = nums[c];      
    }    
    for (let j = 0; j < nums.length; j++) {
        if (nums[j] > pivot) arr[k++] = nums[j];        
    }
    return arr;
};

let nums1 = [9, 12, 5, 10, 14, 3, 10],
    pivot1 = 10;

console.log(pivotArray(nums1, pivot1)); // [9,5,3,10,10,12,14]
