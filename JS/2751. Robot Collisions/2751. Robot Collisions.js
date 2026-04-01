/**
 * @param {number[]} positions
 * @param {number[]} healths
 * @param {string} directions
 * @return {number[]}
 */
var survivedRobotsHealths = function (positions, healths, directions) {
  const n = positions.length;
  const robots = [];

  // 1. Створюємо об'єкти з повною інформацією про кожного робота
  for (let i = 0; i < n; i++) {
    robots.push({
      index: i,
      position: positions[i],
      health: healths[i],
      direction: directions[i],
    });
  }

  // 2. Сортуємо за позицією (зліва направо)
  robots.sort((a, b) => a.position - b.position);

  const stack = [];

  // 3. Симулюємо зіткнення
  for (const robot of robots) {
    if (robot.direction === 'R') {
      stack.push(robot);
    } else {
      let survived = true;

      // Поки в стеку є роботи, що рухаються вправо, і поточний робот 'L' ще живий
      while (stack.length > 0 && stack[stack.length - 1].direction === 'R') {
        const topRobot = stack[stack.length - 1];

        if (topRobot.health > robot.health) {
          topRobot.health -= 1; // Правий робот перемагає
          survived = false;
          break;
        } else if (topRobot.health < robot.health) {
          robot.health -= 1; // Лівий робот перемагає, правий знищується
          stack.pop();
        } else {
          stack.pop(); // Обидва знищуються
          survived = false;
          break;
        }
      }

      // Якщо лівий робот вижив після всіх зіткнень, додаємо його в стек
      if (survived) {
        stack.push(robot);
      }
    }
  }

  // 4. Відновлюємо початковий порядок і повертаємо здоров'я
  stack.sort((a, b) => a.index - b.index);
  return stack.map((robot) => robot.health);
};