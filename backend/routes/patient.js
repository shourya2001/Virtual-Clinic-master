import express from 'express';
import Patient from '../models/patient.js'
import {findPatient} from '../controller/patient.js'
const router = express.Router();

const urlencodedParser = express.urlencoded({ extended: true });

router.get("/:id",urlencodedParser,findPatient)

export default router;