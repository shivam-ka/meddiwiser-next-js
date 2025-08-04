import { env } from "@/env";
import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export default async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("database Already Connected");
    return;
  }

  try {
    const db = await mongoose.connect(env.MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log("Db Connected Successfully");
  } catch (error) {
    console.log("Db Connection Failed !!", error);
    process.exit(1);
  }
}
