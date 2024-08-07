import bcrypt from 'bcryptjs';

export class User {
  id: number;
  nom: string;
  prenom: string;
  age: number;
  identifiant?: string;
  motDePasseHash?: string;

    constructor(
      id: number,
      nom: string,
      prenom: string,
      age: number,
      identifiant?: string,
      motDePasseHash?: string,
      motDePassDejaHash?: string
    ) {
      this.id = id;
      this.nom = nom;
      this.prenom = prenom;
      this.age = age;
      if (identifiant) {
        this.identifiant = identifiant;
        if(motDePasseHash) {
          this.motDePasseHash = this.chiffrerMotDePasse(motDePasseHash);
        }else if(motDePassDejaHash){
          this.motDePasseHash = motDePassDejaHash;
        }
      }

    }

    private chiffrerMotDePasse(motDePasse: string): string {
      const saltRounds = 10;
      return bcrypt.hashSync(motDePasse, saltRounds);
    }

    verifierMotDePasse(motDePasse: string): boolean {
      try {
        if (typeof this.motDePasseHash === 'string' && typeof motDePasse === 'string') {
              const passwordsMatch = bcrypt.compareSync(motDePasse, this.motDePasseHash);
              return passwordsMatch;
        } else {
          console.error('Le mot de passe ou le hash est invalide.');
          return false;
        }
      } catch (error) {
        console.error('Erreur lors de la comparaison des mots de passe :', error);
        return false;
      }
    }

  }