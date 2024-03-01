import { Role, User } from './user';
// import * as bcrypt from 'bcrypt';

export class Staff extends User {
    salaryPerMonth: number;
    workHours: number;
  
    constructor(id: number, nom: string, prenom: string, age: number, role: Role, salaryPerMonth: number, workHours: number) {
      super(id, nom, prenom, age, role, undefined, undefined, undefined);
      this.salaryPerMonth = salaryPerMonth;
      this.workHours = workHours;
    }
  }