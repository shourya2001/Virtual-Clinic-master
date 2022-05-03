import express from 'express';
import bodyParser from 'body-parser';
import Appointment from '../models/appointment.js'
import {createAppointment} from '../controller/appointment.js';
import middlewareObj from '../middleware/index.js';

const router = express.Router();

const jsonParser = express.json();
const urlencodedParser = express.urlencoded({ extended: true });

router.get('/',async (req,res) =>{
    const allAppointments = await Appointment.find()
    try{
        res.status(200).json(allAppointments);
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
})

router.post("/:id",jsonParser,createAppointment)


export default router;


