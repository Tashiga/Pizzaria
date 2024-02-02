import { User } from './user';
// import * as bcrypt from 'bcrypt';

export class Staff extends User {
    salaryPerMonth: number;
    workHours: number;
  
    constructor(id: number, nom: string, prenom: string, age: number, salaryPerMonth: number, workHours: number) {
      super(id, nom, prenom, age, undefined, undefined);
      this.salaryPerMonth = salaryPerMonth;
      this.workHours = workHours;
    }
  }