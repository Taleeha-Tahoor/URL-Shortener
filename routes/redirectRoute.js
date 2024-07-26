import express from "express";
import {handleRedirect} from "../controllers/urlController.js"

const router = express.Router();

router.get("/url/:shortid", handleRedirect);

export default router;