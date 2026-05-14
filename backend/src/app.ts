import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app: Application = express();

//Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: "OK",
        message: "The Kolekta API is running!",
        timestamp: new Date().toISOString(),
    });
});

// We will add routes here later

export default app;