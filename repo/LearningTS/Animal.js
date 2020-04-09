"use strict";
exports.__esModule = true;
var Animal = /** @class */ (function () {
    function Animal(_name, _dob) {
        this.name = _name;
        this.dob = _dob;
    }
    Animal.prototype.sayName = function () {
        console.log('My name is ', this.name);
    };
    return Animal;
}());
exports["default"] = Animal;
