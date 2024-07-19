import { ExpressRouter } from './express-router';
import { ExpressServer } from './express-server';
import { StaffJSONService } from '../staff/staff.json-service';
import { StaffService } from '../staff/staff.service';
import { AdminJSONService } from '../admin/admin.json-service';
import { AdminService } from '../admin/admin.service';
import { UserJSONService } from '../user/user.json-service';
import { UserService } from '../user/user.service';
import { IngredientJsonService } from '../ingredient/ingredient.json-service';
import { IngredientService } from '../ingredient/ingredient.service';
import DbConnection from '../database/dbConfig';
import * as dotenv from 'dotenv';
import { PizzaJSONService } from '../pizza/pizza.json-service';
import { PizzaService } from '../pizza/pizza.service';

export class ExpressApplication {
    private expressRouter!: ExpressRouter;
    private port!: string;
    private server!: ExpressServer;
    private staffService!: StaffService;
    private userService!: UserService;
    private adminService!: AdminService;
    private IngredientService!: IngredientService;
    private pizzaService!: PizzaService
    private database!: DbConnection;

    constructor() {
        this.configureApplication();
    }

    bootstrap(): void {
        this.server.bootstrap();
    }

    private configureApplication(): void {
        this.configureEnvironment();
        this.configureServerPort();
        this.connectDatabsae();
        this.configureServices();
        this.configureExpressRouter();
        this.configureServer();
    }

    private configureEnvironment(): void {
        dotenv.config({
            path: '.env',
        });
    }

    private configureServerPort(): void {
        this.port = this.getPort();
    }

    private configureServices(): void {
        this.userService = new UserJSONService(this.database);
        this.staffService = new StaffJSONService(this.database);
        this.adminService = new AdminJSONService(this.database);
        this.IngredientService = new IngredientJsonService(this.database);
        this.pizzaService = new PizzaJSONService(this.database);
    }

    private configureExpressRouter(): void {
        this.expressRouter = new ExpressRouter(this.userService, this.staffService, this.adminService, this.IngredientService, this.pizzaService);
    }

    private configureServer(): void {
        this.server = new ExpressServer(this.expressRouter, this.port);
    }

    private connectDatabsae(): void {
        const dbConfig = {
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
          };
        this.database = new DbConnection(dbConfig);
    }

    private getPort(): string {
        const port = process.env.PORT;
        if (!port) {
            throw new Error('No port was found in env file.');
        }

        return port;
    }
}