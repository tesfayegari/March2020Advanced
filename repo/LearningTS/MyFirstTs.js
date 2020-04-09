"use strict";
exports.__esModule = true;
var Animal_1 = require("./Animal");
var Pet_1 = require("./Pet");
var myPet = new Animal_1["default"]('Buchi', '4/1/2018');
console.log("My Pet's name is", myPet.name);
console.log("My Pet's DOB is", myPet.dob);
myPet.sayName();
var cat = new Pet_1.Pet('Huro', '3/2/2020');
cat.address = '123 Main St';
cat.sayName();
var tesfaye;
tesfaye = {
    name: 'Tesfaye Gari',
    dob: new Date(),
    phone: '444-444-444',
    email: 'test@email.com',
    sayName: function () { return console.log(name); }
};
