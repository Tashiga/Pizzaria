import { Role, User } from './user';

export class Admin extends User {
    numTel: number;

    constructor(id: number, nom: string, prenom: string, age: number, role: Role, mail: string, identifiant: string, motDePasse: string, numTel: number) {
        super(id, nom, prenom, age, role, mail, identifiant, motDePasse);
        // this.prenom = prenom;
        this.numTel = numTel;
    }
}