import mongoose from 'mongoose';

// import { MongoClient } from "mongodb";

const connection = {};

async function connect() {
    if (connection.isConnected) {
        return;
    }
    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            return;
        }
        await mongoose.disconnect();
    }
    const db = await mongoose.connect("mongodb+srv://amolpatil:9145605182@cluster0.qoc4vgx.mongodb.net/  ");
    connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === 'production') {
            await mongoose.disconnect();
            connection.isConnected = false;
        }
    }
}

const convertDocToObj = (doc) => {
    doc._id = doc._id.toString()
    doc.createdAt = doc.createdAt.toString()
    doc.updatedAt = doc.updatedAt.toString()

    return doc
}

const db = { connect, disconnect, convertDocToObj };
export default db;



// ************************************

// import { MongoClient } from "mongodb";


// export default async function connectedToDatabase() {
//     const client = await MongoClient.connect("mongodb://127.0.0.1:27017/Next_E_Com ")
//     return client;
// }

