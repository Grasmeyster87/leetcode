/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var getCommon = function(nums1, nums2) {
    let i = 0, j = 0;
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] === nums2[j]) return nums1[i];
        if (nums1[i] < nums2[j]) i++;
        else j++;
    }
    return -1;
};

let nums1 = [1,2,3];
let nums2 = [2,4];
console.log(getCommon(nums1, nums2))