import type { Role } from "./user";

export class ProfilUser {
    id: number;
    nom: string;
    prenom: string;
    age: number;
    role: Role;
    mail?: string; // Mail (optionnel)
    identifiant?: string; // Identifiant (optionnel)
    motDePasseHash?: string; // motdepasse (optionnel)
    salaryPerMonth?: number;
    workHours?: number;
    numTel?: number;
    adresse?: string;
    bankCard?: number;


    constructor(id: number,nom: string, prenom: string, age: number, role: Role) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
        this.role = role;
    }
}