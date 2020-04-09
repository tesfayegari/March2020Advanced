export default class Animal {
  name: string;
  dob: string;
  public petType: string;
  constructor(_name: string, _dob: string){
    this.name = _name;
    this.dob = _dob;
  }

  sayName(){
    console.log('My name is ',this.name);
  }
}