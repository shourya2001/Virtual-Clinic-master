import express from 'express';
import bodyParser from 'body-parser';
import {getAllDoctors} from '../controller/doctor.js';


const router = express.Router();

const urlencodedParser = express.urlencoded({ extended: true });

router.get('/',urlencodedParser,getAllDoctors);

export default router;