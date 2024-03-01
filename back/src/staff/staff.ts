import { Role, User } from "../user/user";

export class Staff extends User{

  salaryPerMonth: number;
  workHours: number;

    constructor(
      id: number,
      nom: string, 
      prenom: string, 
      age: number, 
      role: Role,
      salaryPerMonth: number, 
      workHours: number,
      mail?: string,
      identifiant?: string,
      motDePass?: string
    ) {
      super(id, nom, prenom, age, role, mail, identifiant, motDePass);
      this.salaryPerMonth = salaryPerMonth;
      this.workHours = workHours;
    }
  }