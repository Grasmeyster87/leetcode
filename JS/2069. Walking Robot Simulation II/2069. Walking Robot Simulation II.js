/**
 * @param {number} width
 * @param {number} height
 */
var Robot = function(width, height) {
    this.width = width;
    this.height = height;
    
    // Загальна кількість кроків для повного обходу периметра
    this.perimeter = 2 * (width - 1) + 2 * (height - 1);
    
    // Поточна позиція на периметрі (від 0 до perimeter - 1)
    this.currentPos = 0; 
    
    // Прапорець для відстеження того, чи робот вже зрушив з місця.
    // Це важливо для точки (0,0): на початку напрямок "East", а після проходження кола - "South".
    this.hasMoved = false; 
};

/** * @param {number} num
 * @return {void}
 */
Robot.prototype.step = function(num) {
    this.hasMoved = true;
    this.currentPos = (this.currentPos + num) % this.perimeter;
};

/**
 * @return {number[]}
 */
Robot.prototype.getPos = function() {
    let p = this.currentPos;
    let w = this.width;
    let h = this.height;

    // Нижня грань
    if (p < w) {
        return [p, 0];
    }
    // Права грань
    if (p < w + h - 1) {
        return [w - 1, p - w + 1];
    }
    // Верхня грань
    if (p < 2 * w + h - 2) {
        return [w - 1 - (p - (w + h - 2)), h - 1];
    }
    // Ліва грань
    return [0, h - 1 - (p - (2 * w + h - 3))];
};

/**
 * @return {string}
 */
Robot.prototype.getDir = function() {
    let p = this.currentPos;
    let w = this.width;
    let h = this.height;

    // Спеціальний випадок: робот у стартовій точці
    if (p === 0) {
        return this.hasMoved ? "South" : "East";
    }
    // Нижня грань (рухався на Схід)
    if (p < w) {
        return "East";
    }
    // Права грань (рухався на Північ)
    if (p < w + h - 1) {
        return "North";
    }
    // Верхня грань (рухався на Захід)
    if (p < 2 * w + h - 2) {
        return "West";
    }
    // Ліва грань (рухався на Південь)
    return "South";
};

/** * Your Robot object will be instantiated and called as such:
 * var obj = new Robot(width, height)
 * obj.step(num)
 * var param_2 = obj.getPos()
 * var param_3 = obj.getDir()
 */