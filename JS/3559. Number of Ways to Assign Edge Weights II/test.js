// Quick test script
const fs = require('fs');
eval(fs.readFileSync('./3559. Number of Ways to Assign Edge Weights II.js', 'utf8'));
// Test 1: edges = [[1,2]], queries = [[1,1],[1,2]] => [0, 1]
console.log('Test 1:', assignEdgeWeights([[1,2]], [[1,1],[1,2]]));
// Test 2: edges = [[1,2],[1,3],[3,4],[3,5]], queries = [[1,4],[3,4],[2,5]] => [2, 1, 4]
console.log('Test 2:', assignEdgeWeights([[1,2],[1,3],[3,4],[3,5]], [[1,4],[3,4],[2,5]]));