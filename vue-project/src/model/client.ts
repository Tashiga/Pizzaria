import { Role, User } from './user';

export class Client extends User {
    adresse: string;
    numTel?: number;
    bankCard?: number; // Carte bancaire (optionnelle)
    commandes: string[] = []; // Liste de commandes (par exemple, liste de pizzas)
  
    constructor(id: number, nom: string, prenom: string, age: number, role: Role, mail : string, identifiant: string, motDePasse: string, adresse: string, numTel?: number, bankCard?: number) {
      super(id, nom, prenom, age, role, mail, identifiant, motDePasse);
      this.adresse = adresse;
      if(numTel)
        this.numTel = numTel;
      if (bankCard) {
        this.bankCard = bankCard;
      this.commandes = [];
      }
    }
}