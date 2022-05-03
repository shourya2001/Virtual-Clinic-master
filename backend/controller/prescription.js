import Appointment from '../models/appointment.js'

export function addPrescription(req,res){
    Appointment.findById(req.params.id,(err,foundAppointment)=>{
        if(err){
            console.error(err);
            res.status(409).json({message:err.message})
        }else{
            foundAppointment.prescription = req.body;
            foundAppointment.save();
            res.status(200).json(foundAppointment)
        }
    })
}