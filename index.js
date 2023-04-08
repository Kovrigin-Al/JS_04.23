const makeDeepCopy = (input) => {
    if (typeof input !== "object" || !input) {
        throw new Error();
    }
    if (input instanceof String) {
        return new String(input);
    }
    if (input instanceof Number) {
        return new Number(input);
    }
    if (input instanceof Boolean) {
        return new Boolean(input);
    }
    if (input instanceof Date) {
        return new Date(input);
    }
    if (input instanceof RegExp) {
        return new RegExp(input);
    }
    let copy;
    if (input instanceof Array) {
        copy = new Array(input.length);
    }
    for (let key in input) {
        copy[key] = makeDeepCopy(input[key]);
    }
    return copy;
};

const selectFromInterval = (input, startValue, endValue) => {
    if (!Array.isArray(input) || input.length === 0) {
        throw new Error();
    }
    input.forEach((i) => isValueValidNumber(i));
    isValueValidNumber(startValue);
    isValueValidNumber(endValue);
    if (startValue > endValue) {
        const temp = startValue;
        startValue = endValue;
        endValue = temp;
    }
    const result = input.filter((i) => i >= startValue && i <= endValue);
    return result;
};

const createIterable = (from, to) => {
    isValueValidNumber(to);
    isValueValidNumber(from);
    if (to < from) {
        throw new Error();
    }
    return {
        [Symbol.iterator]() {
            return {
                current: from,
                last: to,
                next() {
                    if (this.current <= this.last) {
                        return { done: false, value: this.current++ };
                    } else {
                        return { done: true };
                    }
                },
            };
        },
    };
};

function isValueValidNumber(value) {
    if (typeof value !== "number" || !isFinite(value) || isNaN(value)) {
        throw new Error();
    }
}