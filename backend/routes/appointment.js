import express from 'express';
import bodyParser from 'body-parser';
import {findAppointment, editAppointment, deleteAppointment} from '../controller/appointment.js'

const router = express.Router();

const jsonParser = express.json();
const urlencodedParser = express.urlencoded({ extended: true });

router.get('/meeting/:id', urlencodedParser ,findAppointment)
router.put('/edit-appointment/:id',urlencodedParser ,editAppointment)
router.delete('/delete/:id', deleteAppointment)


export default router;