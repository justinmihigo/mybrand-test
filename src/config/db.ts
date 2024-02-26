import mongoose from "mongoose";
const dbConnection=async()=>{
    try {
        const uri="mongodb://127.0.0.1:27017/posts";
    (await mongoose.connect(uri)).Connection;
    console.log('Database is connected');
    }
    catch (error) {
        console.log(error);
    }
}

export default dbConnection;