class EventEmitter {
    constructor() {
        // Використовуємо Map для зберігання подій та їхніх підписників
        this.events = new Map();
    }

    /**
     * @param {string} eventName
     * @param {Function} callback
     * @return {Object}
     */
    subscribe(eventName, callback) {
        // Якщо подія ще не існує, створюємо для неї порожній масив
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }

        const listeners = this.events.get(eventName);
        listeners.push(callback);

        return {
            unsubscribe: () => {
                // Знаходимо індекс конкретного колбеку та видаляємо його
                const index = listeners.indexOf(callback);
                if (index !== -1) {
                    listeners.splice(index, 1);
                }
                // Повертає undefined за замовчуванням
            }
        };
    }

    /**
     * @param {string} eventName
     * @param {Array} args
     * @return {Array}
     */
    emit(eventName, args = []) {
        // Якщо підписок на цю подію немає, повертаємо порожній масив
        if (!this.events.has(eventName)) {
            return [];
        }

        const listeners = this.events.get(eventName);
        
        // Викликаємо кожен колбек з аргументами та повертаємо масив результатів
        return listeners.map(callback => callback(...args));
    }
}

/**
 * const emitter = new EventEmitter();
 *
 * // Subscribe to the onClick event with onClickCallback
 * function onClickCallback() { return 99 }
 * const sub = emitter.subscribe('onClick', onClickCallback);
 *
 * emitter.emit('onClick'); // [99]
 * sub.unsubscribe(); // undefined
 * emitter.emit('onClick'); // []
 */