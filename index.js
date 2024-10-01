import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express"
import mongoose from "mongoose";
import route from "./routes/userRoute.js";

const app = express();

app.use(bodyParser.json());

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGOURL

mongoose.connect(MONGOURL).then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
        console.log(`server is running at ${PORT}`);
    })
}).catch((err) => console.log(err))

app.use("/api/user", route)
