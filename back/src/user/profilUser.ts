import bcrypt from 'bcrypt';

export class ProfilUser {
  id: number;
  nom: string;
  prenom: string;
  age: number;
  identifiant?: string;
  motDePasseHash?: string;
  adresseMail?: string;
  salaryPerMonth?: number;
  workHours?: number;

    constructor(
      id: number,
      nom: string,
      prenom: string,
      age: number
    ) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
    }

    isAccount(identifiant: string, motDePass: string){
        this.identifiant = identifiant;
        this.motDePasseHash = motDePass;
    }

    isAdmin(mail: string) {
        this.adresseMail = mail;
    }

    isStaff(salaryPerMonth : number, workHours: number) {
        this.salaryPerMonth = salaryPerMonth;
        this.workHours = workHours;
    }
  }