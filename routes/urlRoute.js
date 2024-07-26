import express from "express";
import {handleGenerateURL, handleGetAnalytics} from "../controllers/urlController.js"

const router = express.Router();

router.post("/", handleGenerateURL);

router.get("/analytics/:shortId", handleGetAnalytics);

export default router;