/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
    if (!head || !head.next || k === 0) return head;

    // 1. Знаходимо довжину списку
    let length = 1;
    let tail = head;
    while (tail.next) {
        tail = tail.next;
        length++;
    }

    // 2. Робимо список циклічним
    tail.next = head;

    // 3. Обчислюємо ефективне зміщення
    k = k % length;
    let stepsToNewHead = length - k;

    // 4. Знаходимо нову голову
    let newTail = head;
    for (let i = 1; i < stepsToNewHead; i++) {
        newTail = newTail.next;
    }

    let newHead = newTail.next;

    // 5. Розриваємо цикл
    newTail.next = null;

    return newHead;
};