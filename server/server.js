import "dotenv/config"
import cors from 'cors';
import express from 'express';
import connectDB from './configs/db.js';
import userRouter from "./routes/userRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import { clerkMiddleware } from '@clerk/express';
import hotelRouter from "./routes/hotelRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import clerkWebhooks from "./controllers/clerkWebooks.js";


connectDB();
connectCloudinary();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors()); // Enable Cross Origin Resource Sharing
app.use(express.json());
app.use(clerkMiddleware());
app.use("/api/clerk", clerkWebhooks); // API to listen Clerk Webhooks
app.use(express.urlencoded({extended : true}));


app.get("/", (req, res) => {
    res.send("API is working");
})
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter)

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
});