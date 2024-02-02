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
      workHours: number,
      identifiant?: string,
      motDePass?: string
    ) {
      super(id, nom, prenom, age, identifiant, motDePass);
      this.salaryPerMonth = salaryPerMonth;
      this.workHours = workHours;
    }
  }