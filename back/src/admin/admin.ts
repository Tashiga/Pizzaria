import { Role, User } from "../user/user";

export class Admin extends User{

    numTel: number;

    constructor(
      id: number,
      nom: string, 
      prenom: string, 
      age: number, 
      role: Role,
      mail: string,
      identifiant: string, 
      motDePass: string,
      numTel: number
    ) {
      super(id, nom, prenom, age, role, mail, identifiant, motDePass);
      this.numTel = numTel;
    }
  }