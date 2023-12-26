import { Router } from 'express';
import { StaffService } from '../staff/staff.service';
import { StaffController } from '../staff/staff.controller';
import { StaffRouter } from '../staff/staff.router';
import { AdminService } from '../admin/admin.service';
import { AdminController } from '../admin/admin.controller';
import { AdminRouter } from '../admin/admin.router';
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

    private staffController!: StaffController;
    private staffRouter!: StaffRouter;
    private userController!: UserController;
    private userRouter!:UserRouter;
    private adminController!: AdminController;
    private adminRouter!: AdminRouter;
    private ingredientController!: IngredientController;
    private ingredientRouter!: IngredientRouter;
    private pizzaController!: PizzaController;
    private pizzaRouter!: PizzaRouter

    constructor(private userService: UserService, private staffService: StaffService, private adminService: AdminService, private ingredientService: IngredientService, private pizzaService: PizzaService) {
        this.configureControllers();
        this.configureRouters();
        this.configureRoutes();
    }

    private configureControllers(): void {
        this.userController = new UserController(this.userService);
        this.staffController = new StaffController(this.staffService);
        this.adminController = new AdminController(this.adminService);
        this.ingredientController = new IngredientController(this.ingredientService);
        this.pizzaController = new PizzaController(this.pizzaService);
    }

    private configureRouters(): void {
        this.userRouter = new UserRouter(this.userController);
        this.staffRouter = new StaffRouter(this.staffController);
        this.adminRouter = new AdminRouter(this.adminController);
        this.ingredientRouter = new IngredientRouter(this.ingredientController);
        this.pizzaRouter = new PizzaRouter(this.pizzaController);
    }

    private configureRoutes(): void {
        this.router.use('/admins', this.adminRouter.router);
        this.router.use('/users', this.userRouter.router);
        this.router.use('/staffs', this.staffRouter.router);
        this.router.use('/ingredients', this.ingredientRouter.router);
        this.router.use('/pizzas', this.pizzaRouter.router);
    }
}