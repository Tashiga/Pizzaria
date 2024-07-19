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

    isAccount(mail: string, identifiant: string, motDePass: string){
        this.mail = mail;
        this.identifiant = identifiant;
        this.motDePasseHash = motDePass;
    }

    isAdmin(numTel: number) {
        this.numTel = numTel;
    }

    isStaff(salaryPerMonth : number, workHours: number) {
        this.salaryPerMonth = salaryPerMonth;
        this.workHours = workHours;
    }

    isClient(adresse: string, numTel?: number, bankCard?: number){
        this.adresse = adresse;
        if(numTel)
          this.numTel = numTel;
        if(bankCard)
          this.bankCard = bankCard;
    }
}