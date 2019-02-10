module.exports = class Triangle {
    constructor({a, b, c}) {
        this._a = a;
        this._b = b;
        this._c = c;
        this._type = this.isEquilateral() ? "equilateral" : this.isIsosceles() ? "isosceles" : "scalene"; 
    }

    get type() {
        return this._type;
    }

    isIsosceles() {
        return this._a === this._b || this._a === this._c || this._b === this._c;
    }

    isEquilateral() {
        return this._a === this._b && this._a === this._c;
    }

    static isTriangle({ a, b, c }) {
        return (a + b  >= c) && (a + c >= b) && (b + c >= a) ? true : false;
    }
}