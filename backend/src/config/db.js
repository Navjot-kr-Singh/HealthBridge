const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "../../.env") });

const DB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URL || process.env.MONGO_URI || process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("Missing MongoDB URI. Set MONGODB_URL (or MONGO_URI) in backend/.env");
    }

    await mongoose.connect(mongoUri);
    console.log("Database connected ⭐");
  } catch (e) {
    console.log("Database connection error:", e.message);
    process.exit(1); // stop server if DB fails
  }
};

module.exports = DB;


