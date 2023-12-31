import { ExpressRouter } from './express-router';
import { ExpressServer } from './express-server';
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
    private userService!: UserService;
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
        this.IngredientService = new IngredientJsonService(this.database);
        this.pizzaService = new PizzaJSONService(this.database);
    }

    private configureExpressRouter(): void {
        this.expressRouter = new ExpressRouter(this.userService, this.IngredientService, this.pizzaService);
    }

    private configureServer(): void {
        this.server = new ExpressServer(this.expressRouter, this.port);
    }

    private connectDatabsae(): void {
        const dbConfig = {
            host: 'localhost',
            user: 'root',
            password: 'Sajikha16@',
            database: 'pizzaria'
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