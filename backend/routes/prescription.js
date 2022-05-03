import express from 'express';
import {addPrescription} from '../controller/prescription.js'

const router = express.Router();

const jsonParser = express.json();
const urlencodedParser = express.urlencoded({ extended: true });

router.put('/add-prescription/:id',urlencodedParser,addPrescription)

export default router