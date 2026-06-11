/**
 * @param {number[][]} edges
 * @return {number}
 */
var assignEdgeWeights = function(edges) {
    let n = edges.length + 1;
    let head = new Int32Array(n + 1).fill(-1);
    let to = new Int32Array(n * 2);
    let next = new Int32Array(n * 2);
    let edgeCnt = 0;
    
    for (let i = 0; i < edges.length; i++) {
        let u = edges[i][0];
        let v = edges[i][1];
        
        to[edgeCnt] = v;
        next[edgeCnt] = head[u];
        head[u] = edgeCnt++;
        
        to[edgeCnt] = u;
        next[edgeCnt] = head[v];
        head[v] = edgeCnt++;
    }
    
    let queue = new Int32Array(n);
    let parent = new Int32Array(n + 1).fill(0);
    let qHead = 0;
    let qTail = 0;
    
    queue[qTail++] = 1;
    
    let depth = -1;
    
    while (qHead < qTail) {
        let size = qTail - qHead;
        depth++;
        for (let i = 0; i < size; i++) {
            let u = queue[qHead++];
            for (let e = head[u]; e !== -1; e = next[e]) {
                let v = to[e];
                if (v !== parent[u]) {
                    parent[v] = u;
                    queue[qTail++] = v;
                }
            }
        }
    }
    
    if (depth <= 0) return 0;
    
    let mod = 1000000007n;
    let res = 1n;
    let base = 2n;
    let exp = BigInt(depth - 1);
    
    while (exp > 0n) {
        if (exp % 2n === 1n) {
            res = (res * base) % mod;
        }
        base = (base * base) % mod;
        exp /= 2n;
    }
    
    return Number(res);
};