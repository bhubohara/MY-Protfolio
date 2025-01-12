import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnect from "./databse/dbConnection.js";
import { errorMidleware } from "./middlewares/error.js";

import massageRouter from "./router/messageRouter.js";
import userRegisterRoute from "./router/userRoute.js";
import timelineRouter from "./router/timelineRoutes.js";
import skillRoute from "./router/skillRoute.js";
import projectRoute from "./router/projectRoute.js";
import contactRoute from "./router/contactRoutes.js";

import softwareAppRouter from "./router/softwareAppRoute.js";
const app = express();

dotenv.config({ path: "./config/config.env" });

//midleware-> to connect frontend and backend

app.use(
  cors({
    //it is an array in here we give  url of frontend. this means those url can connected to this backend
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL], // process.env.PORTFOLIO_UR
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true, //The HTTP Access-Control-Allow-Credentials response header is part of the CORS protocol to allow cross-origin sharing
  })
);

app.use(cookieParser()); // it means when u login your user then cookie will generate without using cookei parser we can not access(get) that cookie

app.use(express.json()); //is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.

app.use(express.urlencoded({ extended: true }));
//It parses incoming requests with JSON payloads and is based on body-parser.Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option. This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
); //it is use to get file which we send from frontend or we can use multer

//routers

app.use("/api/v1/message", massageRouter);

app.use("/api/v1/user", userRegisterRoute);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/software", softwareAppRouter);
app.use("/api/v1/skill", skillRoute);
app.use("/api/v1/projects", projectRoute);
app.use("/api/v1/contacts", contactRoute);

//db connection call
dbConnect();

app.use(errorMidleware);

export default app;
