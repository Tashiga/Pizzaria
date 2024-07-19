// import * as bcrypt from 'bcryptjs';

export class User {
    id: number;
    nom: string;
    prenom: string;
    age: number;
    identifiant?: string; // Identifiant (optionnel)
    motDePasseHash?: string;

    constructor(id: number,nom: string, prenom: string, age: number, identifiant?: string, motDePasse?: string) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
        if (identifiant && motDePasse) {
            this.identifiant = identifiant;
            this.motDePasseHash = motDePasse;
            // this.motDePasseHash = this.chiffrerMotDePasse(motDePasse);
        }
    }

    // private chiffrerMotDePasse(motDePasse: string): string {
    //     const saltRounds = 10;
    //     return bcrypt.hashSync(motDePasse, saltRounds);
    // }

    // verifierMotDePasse(motDePasse: string): boolean {
    //     if(this.motDePasseHash)
    //         return bcrypt.compareSync(motDePasse, this.motDePasseHash);
    //     return false;
    // }
}