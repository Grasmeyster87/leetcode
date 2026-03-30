/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
/*var checkStrings = function (s1, s2) {
    const s1EvenArr = [];
    const s1OddArr = [];

    const s2EvenArr = [];
    const s2OddArr = [];

    function fillingArr(s, arr, even) {
        if (even == true) {
            s.split('').forEach((el, index) => {
                if (index % 2 == 0) {
                    arr.push(el);
                }
            });
        } else {
            if (even == false) {
                s.split('').map((el, index) => {
                    if (index % 2 !== 0) {
                        arr.push(el);
                    }
                });
            }
        }
    }
    fillingArr(s1, s1EvenArr, true);
    fillingArr(s1, s1OddArr, false);

    fillingArr(s2, s2EvenArr, true);
    fillingArr(s2, s2OddArr, false);

    s1EvenArr.sort();
    s2EvenArr.sort();
    s1OddArr.sort();
    s2OddArr.sort();

    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        return arr1.every((val, index) => val === arr2[index]);
    }

    return arraysEqual(s1EvenArr, s2EvenArr) && arraysEqual(s1OddArr, s2OddArr)
        ? true
        : false;
};*/

var checkStrings = function(s1, s2) {
    const n = s1.length;
    // Використовуємо Int32Array для швидкої роботи з пам'яттю (26 літер англ. алфавіту)
    const evenFreq = new Int32Array(26);
    const oddFreq = new Int32Array(26);

    for (let i = 0; i < n; i++) {
        // Отримуємо числовий код символу (a = 0, b = 1 і т.д.)
        const charCode1 = s1.charCodeAt(i) - 97;
        const charCode2 = s2.charCodeAt(i) - 97;

        if (i % 2 === 0) {
            evenFreq[charCode1]++; // Додаємо символ з s1
            evenFreq[charCode2]--; // Віднімаємо символ з s2
        } else {
            oddFreq[charCode1]++;
            oddFreq[charCode2]--;
        }
    }

    // Якщо після одного проходу всі значення в масивах рівні 0, 
    // значить набори символів для парних/непарних індексів ідентичні.
    for (let i = 0; i < 26; i++) {
        if (evenFreq[i] !== 0 || oddFreq[i] !== 0) {
            return false;
        }
    }

    return true;
};

s11 = 'cbbdaa';

s12 = 'cabdab';

console.log(checkStrings(s11, s12));
