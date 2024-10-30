import express from "express";
import { addStaff, getHistory } from "../controllers/adminControllers";

const router = express.Router();

router.get('/', getHistory);

router.post('/', addStaff);


export default router;
