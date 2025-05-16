"use server";

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
console.log(MONGODB_URI);

// "mongodb+srv://akchoudhary2411:loan_manager_123@cluster0.efcsa.mongodb.net/";

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your .env file");
}

const cached = global.mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
