import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import mongoose from"mongoose";
import MongoStore from "connect-mongo";
import route from "./routes/router.js";
import cors from "cors";

// import env variables
const { 
    APP_HOSTNAME,
    APP_PORT,
    APP_SECRET,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    FRONTEND_URL} = process.env;

const dbUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

// strict query silenced warning in prevision of mongoose 7
mongoose.set('strictQuery', false);

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true }).then(init);

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors({ origin: FRONTEND_URL, credentials: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  name: "session",
  secret: APP_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: dbUrl }), cookie: { maxAge: 180 * 60 * 1000 }
}));

app.use(express.json());

app.use("/", route);

async function init (){
  app.listen(APP_PORT, () => {
    console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
  });
}