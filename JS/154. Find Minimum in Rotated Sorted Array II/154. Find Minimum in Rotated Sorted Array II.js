/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const mid = (left + right) >> 1;

        if (nums[mid] > nums[right]) {
            // Мінімум знаходиться у правій частині (після mid)
            left = mid + 1;
        } else if (nums[mid] < nums[right]) {
            // Мінімум знаходиться у лівій частині (включно з mid)
            right = mid;
        } else {
            // nums[mid] === nums[right] — не можемо визначити сторону,
            // але right точно не єдиний мінімум, бо mid має те ж значення
            right--;
        }
    }

    return nums[left];
};