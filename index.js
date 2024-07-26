import express from "express";
import path from 'path';
import {connectDb} from "./connect.js";
import urlRoute from "./routes/urlRoute.js";
import redirectRoute from "./routes/redirectRoute.js";
import staticRoute from './routes/staticRouter.js'

const app = express();
const PORT = 8000;

connectDb("mongodb://localhost:27017/short-url").then(() => console.log("Db Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/url", urlRoute);
app.use("/", redirectRoute);
app.use("/", staticRoute);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));