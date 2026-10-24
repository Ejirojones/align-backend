import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// 1. INJECT THE ENVIRONMENT VAULT
// This command reads your local .env file and instantly loads PORT and MONGO_URI into memory.
dotenv.config();

// 2. INITIALIZE THE EXPRESS GATEWAY
const app = express();
const PORT = process.env.PORT || 3000;

// 3. ATTACH THE GATEWAY SECURITY GUARDS
app.use(cors());          // Allows your mobile device to securely retrieve data
app.use(express.json());  // Teaches your server to read incoming JSON data payloads

// 4. TEST ENTRY ROAD (Our First Route)
// When a device navigates to the base URL, this sends a clean verification signal.
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Align App Production API Gateway."
  });
});

// 5. ESTABLISH CONNECTIVITY & FIRE UP ENGINE
// We wrap our connection string in a robust execution block.
const startServer = async () => {
  try {
    // Attempt to bridge the connection to your MongoDB data warehouse
    console.log("Connecting to the database database...");
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("🚀 Database connected successfully.");

    // Fire up the web server listeners
    app.listen(PORT, () => {
      console.log(`===================================================`);
      console.log(`📡 ALIGN SERVER LIVE AND LISTENING ON PORT: ${PORT}`);
      console.log(`===================================================`);
    });
  } catch (error) {
    console.error("❌ CRITICAL ERROR IN SEREVR INITIALIZATION:", error);
    process.exit(1); // Shuts down the script cleanly if connection completely fails
  }
};

startServer();
