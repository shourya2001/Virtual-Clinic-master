import express from 'express';
import {findDoctor} from '../controller/doctor.js'
const router = express.Router();

const urlencodedParser = express.urlencoded({ extended: true });

router.get("/:id",urlencodedParser,findDoctor)

export default router;