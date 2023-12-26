import { Router } from 'express';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { UserRouter } from '../user/user.router';
import { IngredientController } from '../ingredient/ingredient.controller';
import { IngredientRouter } from '../ingredient/ingredient.router';
import { IngredientService } from '../ingredient/ingredient.service';
import { PizzaController } from '../pizza/pizza.controller';
import { PizzaRouter } from '../pizza/pizza.router';
import { PizzaService } from '../pizza/pizza.service';

export class ExpressRouter {
    router = Router();

    private userController!: UserController;
    private userRouter!: UserRouter;
    private ingredientController!: IngredientController;
    private ingredientRouter!: IngredientRouter;
    private pizzaController!: PizzaController;
    private pizzaRouter!: PizzaRouter

    constructor(private userService: UserService, private ingredientService: IngredientService, private pizzaService: PizzaService) {
        this.configureControllers();
        this.configureRouters();
        this.configureRoutes();
    }

    private configureControllers(): void {
        this.userController = new UserController(this.userService);
        this.ingredientController = new IngredientController(this.ingredientService);
        this.pizzaController = new PizzaController(this.pizzaService);
    }

    private configureRouters(): void {
        this.userRouter = new UserRouter(this.userController);
        this.ingredientRouter = new IngredientRouter(this.ingredientController);
        this.pizzaRouter = new PizzaRouter(this.pizzaController);
    }

    private configureRoutes(): void {
        this.router.use('/users', this.userRouter.router);
        this.router.use('/ingredients', this.ingredientRouter.router);
        this.router.use('/pizzas', this.pizzaRouter.router);
    }
}