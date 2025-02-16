import express from 'express';
import * as userController from "../controller/userController.js";

const router = express.Router();

router.post("/save",userController.save);

router.get("/fetch",userController.fetch);

export default router;