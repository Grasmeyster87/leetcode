/**
 * @param {number[]} arr
 * @param {number} d
 * @return {number}
 */
var maxJumps = function(arr, d) {
    const n = arr.length;
    const dp = new Int32Array(n).fill(1);
    const stack = new Int32Array(n);
    let top = 0;
    
    for (let i = 0; i <= n; i++) {
        // Infinity is used at the end to pop all remaining elements from the stack
        const curr = i === n ? Infinity : arr[i];
        
        while (top > 0 && arr[stack[top - 1]] < curr) {
            const val = arr[stack[top - 1]];
            let count = 0;
            
            // Group all adjacent elements in the stack with the same value
            while (top > 0 && arr[stack[top - 1]] === val) {
                count++;
                top--;
            }
            
            // The popped elements are now at stack[top] to stack[top + count - 1]
            for (let k = 0; k < count; k++) {
                const j = stack[top + k];
                
                // Right bound (the current element `i`)
                if (i < n && i - j <= d) {
                    if (dp[j] + 1 > dp[i]) dp[i] = dp[j] + 1;
                }
                
                // Left bound (the new top of the stack)
                if (top > 0) {
                    const left = stack[top - 1];
                    if (j - left <= d) {
                        if (dp[j] + 1 > dp[left]) dp[left] = dp[j] + 1;
                    }
                }
            }
        }
        if (i < n) {
            stack[top++] = i;
        }
    }
    
    let maxPath = 0;
    for (let i = 0; i < n; i++) {
        if (dp[i] > maxPath) maxPath = dp[i];
    }
    
    return maxPath;
};