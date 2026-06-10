/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
/*var maxTotalValue = function(nums, k) {
    
};*/

// Визначення функції, яку викликає раннер: maxTotalValue(nums, k)
function maxTotalValue(nums, k) {
  const n = nums.length;
  if (n === 0 || k === 0) return 0;

  // build log table
  const lg = new Array(n + 1).fill(0);
  for (let i = 2; i <= n; ++i) lg[i] = lg[i >> 1] + 1;
  const LOG = lg[n] + 1;

  // build sparse tables for max and min
  const stMax = Array.from({ length: LOG }, () => new Array(n));
  const stMin = Array.from({ length: LOG }, () => new Array(n));
  for (let i = 0; i < n; ++i) {
    stMax[0][i] = nums[i];
    stMin[0][i] = nums[i];
  }
  for (let j = 1; j < LOG; ++j) {
    const half = 1 << (j - 1);
    for (let i = 0; i + (1 << j) <= n; ++i) {
      stMax[j][i] = Math.max(stMax[j - 1][i], stMax[j - 1][i + half]);
      stMin[j][i] = Math.min(stMin[j - 1][i], stMin[j - 1][i + half]);
    }
  }

  const getDiff = (L, R) => {
    const j = lg[R - L + 1];
    const mx = Math.max(stMax[j][L], stMax[j][R - (1 << j) + 1]);
    const mn = Math.min(stMin[j][L], stMin[j][R - (1 << j) + 1]);
    return mx - mn;
  };

  // Max-heap implementation
  class MaxHeap {
    constructor() { this.a = []; }
    size() { return this.a.length; }
    push(node) {
      this.a.push(node);
      this._siftUp(this.a.length - 1);
    }
    pop() {
      if (this.a.length === 0) return null;
      const top = this.a[0];
      const last = this.a.pop();
      if (this.a.length > 0) {
        this.a[0] = last;
        this._siftDown(0);
      }
      return top;
    }
    _siftUp(i) {
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (this.a[p].val >= this.a[i].val) break;
        [this.a[p], this.a[i]] = [this.a[i], this.a[p]];
        i = p;
      }
    }
    _siftDown(i) {
      const n = this.a.length;
      while (true) {
        let l = i * 2 + 1;
        let r = i * 2 + 2;
        let largest = i;
        if (l < n && this.a[l].val > this.a[largest].val) largest = l;
        if (r < n && this.a[r].val > this.a[largest].val) largest = r;
        if (largest === i) break;
        [this.a[i], this.a[largest]] = [this.a[largest], this.a[i]];
        i = largest;
      }
    }
  }

  // initialize heap with segments [i, n-1]
  const heap = new MaxHeap();
  for (let i = 0; i < n; ++i) {
    heap.push({ val: getDiff(i, n - 1), l: i, r: n - 1 });
  }

  let ans = 0;
  for (let t = 0; t < k; ++t) {
    const cur = heap.pop();
    if (!cur) break; // safety
    ans += cur.val;
    if (cur.r > cur.l) {
      const nr = cur.r - 1;
      heap.push({ val: getDiff(cur.l, nr), l: cur.l, r: nr });
    }
  }
  return ans;
}

// Приклад локального тесту
// console.log(maxTotalValue([1,3,2], 2)); // 4
// console.log(maxTotalValue([4,2,5,1], 3)); // 12

// Якщо раннер передає параметри як param_1, param_2, то виклик виглядає так:
