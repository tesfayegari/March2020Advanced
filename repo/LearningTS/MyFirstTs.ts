import Animal from "./Animal";
import { Person } from "./Util/Person";
import { Pet } from "./Pet";

let myPet = new Animal('Buchi', '4/1/2018');
console.log("My Pet's name is",myPet.name);
console.log("My Pet's DOB is",myPet.dob);
myPet.sayName();


let cat = new Pet('Huro', '3/2/2020');
cat.address = '123 Main St';
cat.sayName();

let tesfaye: Person;
tesfaye= {
  name: 'Tesfaye Gari', 
  dob: new Date(),
  phone: '444-444-444', 
  email: 'test@email.com' ,
  sayName: ()=>console.log(name)
}



