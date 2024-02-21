import { User } from './user';

export class Admin extends User {
    adresseMail: string;

    constructor(id: number, nom: string, prenom: string, age: number, identifiant: string, motDePasse: string, adresseMail: string) {
        super(id, nom, prenom, age, identifiant, motDePasse);
        this.prenom = prenom;
        this.adresseMail = adresseMail;
    }
}