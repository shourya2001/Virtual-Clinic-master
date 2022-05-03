import Patient from '../models/patient.js';
import bcrypt from 'bcrypt';
import cloud from 'cloudinary';

const cloudinary = cloud.v2;

export const getPatient = async (req,res) =>{
    const allPatients = await Patient.find()
    try{
        res.status(200).json(allPatients);
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}


export const createPatient = async (req,res) =>{
    Patient.findOne({email:req.body.email},(patient,err,done)=>{
        if(patient){
            return done(null,false,{message:"Email already registered"})
        }
    })
    const saltRounds =10
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const patient = {...req.body,"password": hash,"role": "patient",fullName: `${req.body.firstName} ${req.body.lastName}`};
    const newPatient = new Patient(patient);
    try{
        await Patient.create(newPatient);
        res.status(201).json(newPatient);
    }  
    catch(error){
        res.status(409).json({message: error.message})
    }
}


export const findPatient = async (req,res)=>{
    Patient.findById(req.params.id).populate("appointments").exec((err,foundPatient)=>{
        if(err){
            console.error(err);
            res.status(409).json({message:"Patient not found"})
        }else{
            foundPatient.appointments.sort(function(a,b){
                var dateA = new Date(a.date), dateB = new Date(b.date);
                return dateB - dateA;
            })
            res.status(200).json(foundPatient)
        }
    })
}
