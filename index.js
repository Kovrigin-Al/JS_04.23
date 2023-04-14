function curry(callback) {
    return function curried(...args) {
        if (args.length >= callback.length) {
            return callback.apply(this, args);
        } else {
            return function (...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}

class Calculator {
    constructor(x, y) {
        if (this._isValidNumber(x)) {
            this.x = x;
        }
        if (this._isValidNumber(y)) {
            this.y = y;
        }
    }

    setY = (num) => {
        this._isValidNumber(num);
        this.y = num;
    };

    setX = (num) => {
        this._isValidNumber(num);
        this.x = num;
    };

    getSum = () => {
        return this.x + this.y;
    };

    getMul = () => {
        return this.x * this.y;
    };

    getSub = () => {
        return Math.abs(this.x - this.y);
    };

    getDiv = () => {
        if (this.y === 0) {
            throw new Error("");
        } else {
            return this.x / this.y;
        }
    };

    _isValidNumber = (value) => {
        if (typeof value !== "number" || !isFinite(value) || isNaN(value)) {
            throw new Error("");
        } else {
            return true;
        }
    };
}

class RickAndMorty {
    getCharacter = (id) => {
        if (this._isValidNumber(id)) {
            return fetch(`https://rickandmortyapi.com/api/character/${id}`)
                .then((response) => response.ok && response.json())
                .then((data) => data || null)
                .catch(() => null);
        }
    };
    getEpisode = async (id) => {
        if (this._isValidNumber(id)) {
            try {
                const response = await fetch(
                    `https://rickandmortyapi.com/api/episode/${id}`
                );
                if (!response.ok) {
                    return null;
                }
                const episode = await response.json();
                return episode;
            } catch {
                return null;
            }
        }
    };
    _isValidNumber = (value) => {
        if (typeof value !== "number" || !isFinite(value) || isNaN(value)) {
            throw new Error("");
        } else {
            return true;
        }
    };
}
