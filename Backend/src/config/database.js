import mongoose from "mongoose";

const connectDB = async () => {

    try{

        const connection = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`\nConnected to MongoDB on port: ${connection.connection.host} `  );

    } catch (err){
        console.error("MongoDB connection error: " + err, err);
        process.exit(1);
    }
}

export default connectDB;