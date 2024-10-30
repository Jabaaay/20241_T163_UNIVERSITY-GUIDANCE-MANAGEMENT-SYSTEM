import express from "express";
import {getHistory, addApp, cancelApp, updateApp} from '../controllers/studentApp.js'


const router = express.Router();

router.get('/', getHistory);

router.post('/', addApp);

router.delete('/', cancelApp);

router.put('/', updateApp);

export default router;

