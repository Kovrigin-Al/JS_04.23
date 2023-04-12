Array.prototype.customFilter = function (callback, thisArg) {
    let filtered = [];
    for (let i = 0; i < this.length; i++) {
        if (callback.call(thisArg, this[i], i, this)) {
            filtered.push(this[i]);
        }
    }
    return filtered;
};

function createDebounceFunction(callback, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => callback(), delay);
    };
}
