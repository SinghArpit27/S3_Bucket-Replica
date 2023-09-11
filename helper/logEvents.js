import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const logEventEntry = () => {

    const logFilePath = path.join(__dirname, '../Logs/logs.log');
    const accessLogStream = fs.createWriteStream(logFilePath, { flags: 'a' });

}


// Define the log file path and create a writable stream
// const logFilePath = path.join(__dirname, 'logs', 'access.log');

// // Create a log entry and write it to a file
// const createLogEntry = async (req, res) => {
//   try {
//     const logData = req.body; // Get log data from the request body
//     const logEntry = `${new Date().toISOString()}: ${logData.message}\n`;

//     // Append the log entry to the log file
//     fs.appendFileSync(logFilePath, logEntry);

//     res.status(201).json({ message: 'Log entry created' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error creating log entry' });
//   }
// };
// export { createLogEntry };
