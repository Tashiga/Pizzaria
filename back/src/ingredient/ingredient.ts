// import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Pizza } from '../pizza/pizza'; // Supposons qu'il existe une entité Pizza pour la relation many-to-many

export class Ingredient {
    constructor(
        public id: number,
        public name: string,
        public pizza?:Pizza
    )
    {}
}

