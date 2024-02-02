
export class ProfilUser {
    id: number;
    nom: string;
    prenom: string;
    age: number;
    identifiant?: string; // Identifiant (optionnel)
    motDePasseHash?: string; // motdepasse (optionnel)
    adresseMail?: string;
    salaryPerMonth?: number;
    workHours?: number;


    constructor(id: number,nom: string, prenom: string, age: number) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
    }
}