import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoute from './modules/user/router/userRoute.js';
import bucketRoute from './modules/user/router/userBucketRoute.js';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerDefinition } from './swaggerDefinition.js'

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// LOG 
// Configure Morgan to write logs to the accessLogStream
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFilePath = path.join(__dirname, './Logs/logs.log');
const accessLogStream = fs.createWriteStream(logFilePath, { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));


// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

// User Routes
app.use('/', authRoute);

// Bucket Routes
app.use('/bucket', bucketRoute);


app.listen(process.env.PORT, () => {
    console.log(`Server is listening on PORT: ${process.env.PORT}`);
});