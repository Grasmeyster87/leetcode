/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteMiddle = function(head) {
    // Якщо лише один вузол — видаляємо його, повертаємо null
    if (!head.next) return null;

    // slow зупиниться на вузлі ПЕРЕД серединою
    let slow = head, fast = head.next.next;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Пропускаємо середній вузол
    slow.next = slow.next.next;

    return head;
};