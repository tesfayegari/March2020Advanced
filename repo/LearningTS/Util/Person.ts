export interface Person {
  name: string;
  dob: Date;
  phone?: string;
  email: string;
  sayName: ()=>void;
}
