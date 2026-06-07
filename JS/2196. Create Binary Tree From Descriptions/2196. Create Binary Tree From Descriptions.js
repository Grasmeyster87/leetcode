v/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[][]} descriptions
 * @return {TreeNode}
 */
var createBinaryTree = function(descriptions) {
    const nodes = new Map();
    const children = new Set();
    
    for (const [parentVal, childVal, isLeft] of descriptions) {
        if (!nodes.has(parentVal)) {
            nodes.set(parentVal, new TreeNode(parentVal));
        }
        if (!nodes.has(childVal)) {
            nodes.set(childVal, new TreeNode(childVal));
        }
        
        children.add(childVal);
        
        const parentNode = nodes.get(parentVal);
        const childNode = nodes.get(childVal);
        
        if (isLeft === 1) {
            parentNode.left = childNode;
        } else {
            parentNode.right = childNode;
        }
    }
    
    for (const parentVal of nodes.keys()) {
        if (!children.has(parentVal)) {
            return nodes.get(parentVal);
        }
    }
    
    return null;
};