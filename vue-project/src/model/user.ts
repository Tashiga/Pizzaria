// import * as bcrypt from 'bcrypt';

export class User {
    id: number;
    nom: string;
    prenom: string;
    age: number;
    role: Role;
    mail?: string; //optionnel - quand un compte
    identifiant?: string; // Identifiant (optionnel)
    motDePasseHash?: string;

    constructor(id: number,nom: string, prenom: string, age: number, role: Role, mail?: string, identifiant?: string, motDePasse?: string) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
        this.role = role;
        if (mail && identifiant && motDePasse) {
            this.mail = mail;
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

export enum Role {
    Staff = "Staff",
    Admin = "Admin",
    Client = "Client",
}