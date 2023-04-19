class Elem {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class Stack {
    #size = 0;
    #head = null;
    #maxSize;

    constructor(maxSize = 10) {
        if (this.#isValidNumber(maxSize)) {
            this.#maxSize = maxSize;
        }
    }

    #isValidNumber(value) {
        if (Number.isInteger(value) && value > 0) {
            return true;
        } else {
            throw new Error("Invalid limit value");
        }
    }

    #hasRoom() {
        if (this.#size < this.#maxSize) {
            return true;
        } else {
            throw new Error("Limit exceeded");
        }
    }

    isEmpty() {
        return this.#size === 0;
    }

    push(data) {
        if (this.#hasRoom()) {
            const newElement = new Elem(data);
            newElement.next = this.#head;
            this.#head = newElement;
            this.#size++;
        }
    }

    pop() {
        const head = this.#head;
        this.#removeHead();
        return head.data;
    }

    #removeHead() {
        if (this.isEmpty()) {
            throw new Error("Empty stack");
        } else {
            this.#head = this.#head.next;
            this.#size--;
        }
    }

    peek() {
        if (this.isEmpty()) {
            return this.#head;
        } else {
            return this.#head.data;
        }
    }

    toArray() {
        const result = [];
        let current = this.#head;
        for (let i = 0; i < this.#size; i++, current = current.next) {
            result.unshift(current.data);
        }
        return result;
    }

    static fromIterable(input) {
        if (this.#isIterable(input)) {
            return this.#createStackFromIterable(input);
        }
    }

    static #createStackFromIterable(iterable) {
        const stack = new Stack(iterable.length);
        for (let i of iterable) {
            stack.push(i);
        }
        return stack;
    }

    static #isIterable(input) {
        if (input != null && typeof input[Symbol.iterator] === "function") {
            return true;
        } else {
            throw new Error("Not iterable");
        }
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    append(data) {
        if (!this.head) {
            this.head = new Elem(data);
        } else {
            let tail;
            this.#iterateList((i) => {
                tail = i.next === null ? i : tail;
            });
            tail.next = new Elem(data);
        }
    }

    prepend(data) {
        const currentHead = this.head;
        if (currentHead) {
            this.head = new Elem(data);
            this.head.next = currentHead;
        }
    }

    find(elem) {
        let result = null;
        this.#iterateList((i) => {
            result = i.data === elem ? i.data : result;
        });
        return result;
    }

    toArray() {
        const result = [];
        this.#iterateList((i) => result.unshift(i.data));
        return result;
    }

    static fromIterable(input) {
        if (this.#isIterable(input)) {
            return this.#createListFromIterable(input);
        }
    }

    static #createListFromIterable(iterable) {
        const list = new LinkedList();
        for (let i of iterable) {
            list.append(i);
        }
        return list;
    }

    static #isIterable(input) {
        if (input != null && typeof input[Symbol.iterator] === "function") {
            return true;
        } else {
            throw new Error("Not iterable");
        }
    }

    #iterateList(callback) {
        for (let i = this.head; i !== null; i = i.next) {
            callback(i);
        }
    }
}

class Car {
    #brand = "";
    #model = "";
    #yearOfManufacturing = 1950;
    #maxSpeed = 100;
    #maxFuelVolume = 20;
    #fuelConsumption = 1;
    #damage = 1;
    #currentFuelVolume = 0;
    #isStarted = false;
    #mileage = 0;
    #health = 100;

    constructor() {}

    get brand() {
        return this.#brand;
    }
    set brand(value) {
        if (typeof value !== "string" || value.trim() || value.trim().length > 50) {
            throw new Error("Invalid brand name");
        }
        this.#brand = value;
    }

    get model() {
        return this.#model;
    }
    set model(value) {
        if (typeof value !== "string" || value.trim() || value.trim().length > 50) {
            throw new Error("Invalid model name");
        }
        this.#model = value;
    }

    get yearOfManufacturing() {
        return this.#yearOfManufacturing;
    }
    set yearOfManufacturing(value) {
        const currentYear = new Date().getFullYear();
        if (!Number.isInteger(value) || value < 1950 || value > currentYear) {
            throw new Error("Invalid year of manufacturing");
        }
        this.#yearOfManufacturing = value;
    }

    get maxSpeed() {
        return this.#maxSpeed;
    }
    set maxSpeed(value) {
        if (!Number.isInteger(value) || value < 100 || value > 330) {
            throw new Error("Invalid max speed");
        }
        this.#maxSpeed = value;
    }

    get maxFuelVolume() {
        return this.#maxFuelVolume;
    }
    set maxFuelVolume(value) {
        if (!Number.isInteger(value) || value < 20 || value > 100) {
            throw new Error("Invalid max fuel volume");
        }
        this.#maxFuelVolume = value;
    }

    get fuelConsumption() {
        return this.#fuelConsumption;
    }
    set fuelConsumption(value) {
        if (!Number.isInteger(value) || value < 1) {
            throw new Error("Invalid fuel consumption");
        }
        this.#fuelConsumption = value;
    }

    get damage() {
        return this.#damage;
    }
    set damage(value) {
        if (!Number.isInteger(value) || value < 1 || value > 5) {
            throw new Error("Invalid damage");
        }
        this.#damage = value;
    }

    get currentFuelVolume() {
        return this.#currentFuelVolume;
    }

    get isStarted() {
        return this.#isStarted;
    }

    get mileage() {
        return this.#mileage;
    }

    get health() {
        return this.#health;
    }

    start() {
        if (this.#isStarted) {
            throw new Error("Car has already started");
        } else {
            this.#isStarted = true;
        }
    }

    shutDownEngine() {
        if (!this.#isStarted) {
            throw new Error("Car hasn't started yet");
        } else {
            this.#isStarted = false;
        }
    }

    fillUpGasTank(value) {
        if (!Number.isInteger(value) || value <= 0) {
            throw new Error("Invalid fuel amount");
        }
        if (this.#currentFuelVolume + value > this.#maxFuelVolume) {
            throw new Error("Too much fuel");
        }
        if (this.#isStarted) {
            throw new Error("You have to shut down your car first");
        }
        this.#currentFuelVolume = this.#currentFuelVolume + value;
    }

    drive(speed, hours) {
        if (!Number.isInteger(speed) || speed <= 0) {
            throw new Error("Invalid speed");
        }
        if (!Number.isInteger(hours) || hours <= 0) {
            throw new Error("Invalid duration");
        }
        if (speed > this.#maxSpeed) {
            throw new Error("Car can't go this fast");
        }
        if (!this.#isStarted) {
            throw new Error("You have to start your car first");
        }

        const distance = speed * hours;
        const fuelRequired = (this.#fuelConsumption / 100) * distance;
        const healthRequired = (this.#damage / 100) * distance;

        if (this.#currentFuelVolume < fuelRequired) {
            throw new Error("You don't have enough fuel");
        }
        if (this.#health < healthRequired) {
            throw new Error("Your car won’t make it");
        }

        this.#currentFuelVolume = this.#currentFuelVolume - fuelRequired;
        this.#health = this.#health - healthRequired;
        this.#mileage = this.#mileage + distance;
    }

    repair() {
        if (this.#isStarted) {
            throw new Error("You have to shut down your car first");
        }
        if (this.#currentFuelVolume !== this.#maxFuelVolume) {
            throw new Error("You have to fill up your gas tank first");
        }
        this.#health = 100;
    }

    getFullAmount() {
        return this.#maxFuelVolume - this.#currentFuelVolume;
    }
}
