/**
 * @param {number[][]} edges
 * @param {number[][]} queries
 * @return {number[]}
 */
var assignEdgeWeights = function(edges, queries) {
    const MOD = 1000000007n;
    const n = edges.length + 1;
    const LOG = Math.ceil(Math.log2(n + 1)) + 1;

    // --- Build adjacency list (CSR-style) ---
    const head = new Int32Array(n + 1).fill(-1);
    const to = new Int32Array(n * 2);
    const nxt = new Int32Array(n * 2);
    let edgeCnt = 0;

    for (let i = 0; i < edges.length; i++) {
        const u = edges[i][0];
        const v = edges[i][1];

        to[edgeCnt] = v;
        nxt[edgeCnt] = head[u];
        head[u] = edgeCnt++;

        to[edgeCnt] = u;
        nxt[edgeCnt] = head[v];
        head[v] = edgeCnt++;
    }

    // --- BFS to compute depth + parent ---
    const depth = new Int32Array(n + 1);
    const parent = new Int32Array(n + 1);
    const order = new Int32Array(n);          // BFS order for building up[]
    let qH = 0, qT = 0;

    parent[1] = -1;
    depth[1] = 0;
    order[qT++] = 1;

    while (qH < qT) {
        const u = order[qH++];
        for (let e = head[u]; e !== -1; e = nxt[e]) {
            const v = to[e];
            if (v !== parent[u] && parent[v] === 0 && v !== 1) {
                // v hasn't been visited yet
                parent[v] = u;
                depth[v] = depth[u] + 1;
                order[qT++] = v;
            }
        }
    }

    // Fix: parent[1] = 1 for convenience (self-loop at root for LCA)
    parent[1] = 1;

    // --- Binary Lifting table ---
    // up[k][v] = 2^k-th ancestor of v
    const up = new Array(LOG);
    for (let k = 0; k < LOG; k++) {
        up[k] = new Int32Array(n + 1);
    }

    // up[0][v] = parent[v]
    for (let i = 0; i <= n; i++) {
        up[0][i] = parent[i];
    }

    for (let k = 1; k < LOG; k++) {
        for (let v = 1; v <= n; v++) {
            up[k][v] = up[k - 1][up[k - 1][v]];
        }
    }

    // --- LCA query ---
    function lca(u, v) {
        if (depth[u] < depth[v]) { let t = u; u = v; v = t; }

        // Bring u to same depth as v
        let diff = depth[u] - depth[v];
        for (let k = 0; diff > 0; k++, diff >>= 1) {
            if (diff & 1) u = up[k][u];
        }

        if (u === v) return u;

        // Binary lift both
        for (let k = LOG - 1; k >= 0; k--) {
            if (up[k][u] !== up[k][v]) {
                u = up[k][u];
                v = up[k][v];
            }
        }

        return up[0][u];
    }

    // --- Precompute powers of 2 mod (10^9 + 7) ---
    let maxDepth = 0;
    for (let i = 1; i <= n; i++) {
        if (depth[i] > maxDepth) maxDepth = depth[i];
    }
    // Max path length = 2 * maxDepth
    const maxLen = maxDepth * 2;
    const pow2 = new BigInt64Array(maxLen + 1);
    pow2[0] = 1n;
    for (let i = 1; i <= maxLen; i++) {
        pow2[i] = (pow2[i - 1] * 2n) % MOD;
    }

    // --- Answer queries ---
    const ans = new Array(queries.length);
    for (let i = 0; i < queries.length; i++) {
        const u = queries[i][0];
        const v = queries[i][1];

        if (u === v) {
            ans[i] = 0;
            continue;
        }

        const l = lca(u, v);
        const k = depth[u] + depth[v] - 2 * depth[l]; // number of edges on path

        if (k === 0) {
            ans[i] = 0;
        } else {
            // Number of ways to assign weights so that sum is odd = 2^(k-1)
            ans[i] = Number(pow2[k - 1]);
        }
    }

    return ans;
};