import { Role, User } from "../user/user";

export class Client extends User{

    adresse: string;
    numTel?: number;
    bankCard?:number;

    constructor(
      id: number,
      nom: string, 
      prenom: string, 
      age: number, 
      role: Role,
      mail: string,
      identifiant: string, 
      motDePass: string,
      adresse: string,
      numTel?: number,
      bankCard?:number
    ) {
      super(id, nom, prenom, age, role, mail, identifiant, motDePass);
      this.adresse = adresse;
      if(numTel)
        this.numTel = numTel;
      if(bankCard)
        this.bankCard = bankCard;
    }
  }