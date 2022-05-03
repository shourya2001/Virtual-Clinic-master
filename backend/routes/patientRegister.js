import express from 'express';
import bodyParser from 'body-parser';
import {getPatient, createPatient} from '../controller/patient.js';

const router = express.Router();

const jsonParser = express.json();
const urlencodedParser = express.urlencoded({ extended: true });

router.get("/",urlencodedParser, getPatient)
router.post('/',jsonParser,createPatient);


export default router;