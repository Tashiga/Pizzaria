// import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Ingredient } from '../ingredient/ingredient'; // Supposez qu'il existe une entité Ingredient pour les ingrédients

export class Pizza {
    constructor(
        public id: number,
        public name: string,
        public price:number,
        public ingredients?: Ingredient[]
    ){}

}
