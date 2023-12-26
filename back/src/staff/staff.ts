import { User } from "../user/user";

export class Staff extends User{

  salaryPerMonth: number;
  workHours: number;

    constructor(
      id: number,
      nom: string, 
      prenom: string, 
      age: number, 
      salaryPerMonth: number, 
      workHours: number
    ) {
      super(id, nom, prenom, age);
      this.salaryPerMonth = salaryPerMonth;
      this.workHours = workHours;
    }
  }