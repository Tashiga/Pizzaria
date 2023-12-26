import { User } from './user';

class Client extends User {
    adresseMail: string;
    numeroTelephone: string;
    adresse: string;
    carteBancaire?: string; // Carte bancaire (optionnelle)
    commandes: string[]; // Liste de commandes (par exemple, liste de pizzas)
  
    constructor(id: number, nom: string, prenom: string, age: number, identifiant: string, motDePasse: string, adresseMail: string, numeroTelephone: string, adresse: string, commandes: string[], carteBancaire?: string) {
      super(id, nom, prenom, age, identifiant, motDePasse);
      this.adresseMail = adresseMail;
      this.numeroTelephone = numeroTelephone;
      this.adresse = adresse;
      this.commandes = commandes;
      if (carteBancaire) {
        this.carteBancaire = carteBancaire;
      }
    }
}