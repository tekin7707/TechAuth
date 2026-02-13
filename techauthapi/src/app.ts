import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { logger } from './utils/logger';

const app: Application = express();

// Security middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "unsafe-none" }
}));

// CORS
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'https://techauth.eu',
    'http://techauth.eu',
    'http://localhost:3001',
    'http://localhost:5173'
].filter(Boolean) as string[];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan('combined', {
    stream: {
        write: (message: string) => logger.info(message.trim()),
    },
}));

// Root health check for deployment platforms (like Replit)
app.get('/', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'Auth Service is healthy',
    });
});

// Routes
app.use('/api', routes);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
