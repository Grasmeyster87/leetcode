const MOD = BigInt(1e9 + 7);

var Fancy = function() {
    this.list = [];
    this.a = 1n; // Кумулятивний множник
    this.b = 0n; // Кумулятивний доданок
};

/** * Допоміжна функція для швидкого піднесення до степеня за модулем
 */
Fancy.prototype.power = function(base, exp) {
    let res = 1n;
    base %= MOD;
    while (exp > 0n) {
        if (exp % 2n === 1n) res = (res * base) % MOD;
        base = (base * base) % MOD;
        exp /= 2n;
    }
    return res;
};

/** * Обчислення модульного зворотного елемента (a^-1 mod M)
 */
Fancy.prototype.modInverse = function(n) {
    return this.power(n, MOD - 2n);
};

/** * @param {number} val
 * @return {void}
 */
Fancy.prototype.append = function(val) {
    // Зберігаємо значення x, яке при поточному a та b дасть val
    // x = (val - b) / a  => (val - b) * modInverse(a)
    let valBI = BigInt(val);
    let x = ((valBI - this.b + MOD) % MOD * this.modInverse(this.a)) % MOD;
    this.list.push(x);
};

/** * @param {number} inc
 * @return {void}
 */
Fancy.prototype.addAll = function(inc) {
    this.b = (this.b + BigInt(inc)) % MOD;
};

/** * @param {number} m
 * @return {void}
 */
Fancy.prototype.multAll = function(m) {
    let mBI = BigInt(m);
    this.a = (this.a * mBI) % MOD;
    this.b = (this.b * mBI) % MOD;
};

/** * @param {number} idx
 * @return {number}
 */
Fancy.prototype.getIndex = function(idx) {
    if (idx >= this.list.length) return -1;
    // Обчислюємо поточне значення: (a * x + b) % MOD
    return Number((this.a * this.list[idx] + this.b) % MOD);
};