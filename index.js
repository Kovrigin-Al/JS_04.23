class Calculator {
    #setDisplay;
    #previous = null;
    #current = "0";
    #operation = null;
    constructor(display) {
        this.#setDisplay = () => {
            display[0].textContent = this.#current;
        };
    }
    init(buttons) {
        for (let b of buttons.numberButtons) {
            b.addEventListener("click", (e) => this.#onNumberButtonPress(e));
        }
        for (let b of buttons.operationButton) {
            b.addEventListener("click", (e) => this.#onOperationButtonPress(e));
        }
        buttons.doubleNull.addEventListener("click", () => this.#onDoubleNull());
        buttons.cleanButton.addEventListener("click", () => this.#onClean());
        buttons.deleteButton.addEventListener("click", () => this.#onDelete());
        buttons.negateButton.addEventListener("click", () => this.#onNegate());
        buttons.dotButton.addEventListener("click", () => this.#onAddDot());
        buttons.equalButton.addEventListener("click", () => this.#onEqualPress());
    }

    #onNumberButtonPress(event) {
        if (this.#current === "0" || this.#current === null) {
            this.#current = event.target.innerHTML;
        } else if (this.#current.length > 14) {
            return;
        } else {
            this.#current += event.target.innerHTML;
        }
        this.#setDisplay();
    }

    #onOperationButtonPress(event) {
        if (this.#current === null) {
            this.#operation = event.target.innerHTML;
            return;
        }
        if (this.#previous !== null && this.#operation) {
            this.#calculate();
        } else {
            this.#previous = this.#current;
            this.#setDisplay();
        }
        this.#current = null;
        this.#operation = event.target.innerHTML;
    }

    #calculate() {
        const calculate = {
            "+": (x, y) => {
                console.log(Number(this.#previous), Number(this.#current));
                console.log(Number(x), Number(y));
                console.log(x + y);
                return x + y;
            },
            "-": (x, y) => x - y,
            "/": (x, y) => {
                if (y === 0) {
                    return "Error";
                } else {
                    return x / y;
                }
            },
            "*": (x, y) => x * y,
        };
        const result = calculate[this.#operation](
            Number(this.#previous),
            Number(this.#current)
        );
        console.log(result, Number(this.#previous), Number(this.#current));
        if (result === "Error") {
            this.#current = result;
            this.#setDisplay();
            this.#current = "0";
            this.#previous = null;
            return;
        }
        this.#current = Number(result.toPrecision(15)).toString();
        this.#previous = Number(result.toPrecision(15)).toString();
        this.#setDisplay();
    }

    #onDoubleNull() {
        if (this.#current === null) {
            this.#current = "0";
        }
        if (this.#current.length === 14) {
            this.#current += "0";
        }
        if (this.#current !== "0" && this.#current.length < 14) {
            this.#current += "00";
        }
        this.#setDisplay();
    }

    #onClean() {
        this.#current = "0";
        this.#operation = null;
        this.#previous = null;
        this.#setDisplay();
    }

    #onDelete() {
        if (/^(-.|.{1})$/.test(this.#current)) {
            this.#current = "0";
        } else if (this.#current === null || this.#current.indexOf("e") !== -1) {
            this.#current = "0";
            this.#operation = null;
        } else {
            this.#current = this.#current.substring(0, this.#current.length - 1);
        }
        this.#setDisplay();
    }

    #onNegate() {
        if (this.#current === null) {
            this.#current = "0";
        }
        if (Number(this.#current) > 0) {
            this.#current = "-" + this.#current;
        } else if (Number(this.#current) < 0) {
            this.#current = this.#current.substring(1, this.#current.length);
        }
        this.#setDisplay();
    }

    #onAddDot() {
        if (this.#current && this.#current.indexOf(".") === -1) {
            this.#current += ".";
            this.#setDisplay();
        }
    }

    #onEqualPress() {
        if (this.#previous && this.#current && this.#operation) {
            this.#calculate();
            this.#operation = null;
            this.#previous = null;
        }
    }
}

const buttons = {
    numberButtons: document.getElementsByClassName("number-btn"),
    doubleNull: document.getElementsByClassName("doubleNull-btn")[0],
    cleanButton: document.getElementsByClassName("clean-btn")[0],
    deleteButton: document.getElementsByClassName("delete-btn")[0],
    negateButton: document.getElementsByClassName("negate-btn")[0],
    operationButton: document.getElementsByClassName("operation-btn"),
    dotButton: document.getElementsByClassName("dot-btn")[0],
    equalButton: document.getElementsByClassName("equal-btn")[0],
};

const display = document.getElementsByClassName("display");
const calculator = new Calculator(display);
calculator.init(buttons, display);
