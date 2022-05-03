import express from 'express';
import bodyParser from 'body-parser';
import {createDoctor} from '../controller/doctor.js';

const router = express.Router();

const jsonParser = express.json();

router.post('/',jsonParser,createDoctor);

export default router;
