import mongoose from "mongoose"

export const connectMongo = async () => {

    try {
        await mongoose.connect(process.env.DB_CONNECTION_URL)
        console.log("Database connected!")
    } catch (error) {
        console.error("Error connecting to database", error)
    }
}