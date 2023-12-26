import { User } from "../user/user";

export class Admin extends User{

    adresseMail: string;

    constructor(
      id: number,
      nom: string, 
      prenom: string, 
      age: number, 
      identifiant: string, 
      motDePass: string,
      mail: string
    ) {
      super(id, nom, prenom, age, identifiant, motDePass);
      this.adresseMail = mail;
    }
  }