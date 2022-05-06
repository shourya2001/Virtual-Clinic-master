import Doctor from '../models/doctor.js';
import bcrypt from 'bcrypt';
import cloud from 'cloudinary';
import multer from 'multer';
import cloudinary from '../middleware/cloudinary.config.js';
import Appointment from '../models/appointment.js'
import lodash from 'lodash';

export const getAllDoctors = async (req,res) =>{
    const allDoctors = await Doctor.find({})
    try{
        res.status(200).json(allDoctors);
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}

// export const createDoctor =  (req,res) =>{
//     Doctor.findOne({email:req.body.email},(doc,err,done)=>{
//         if(doc){
//             return done(null,false,{message: "Email already registered"})
//         }
//     })
//     const salt = bcrypt.genSaltSync();
//     const hash = bcrypt.hashSync(req.body.password, salt);
//     let fullName = req.body.firstName + " " + req.body.lastName;
//     if(req.body.image){
//         cloudinary.uploader.upload(req.body.image, (error,result)=>{
//             const doctor = {...req.body,"password": hash,"role": "doctor", "fullName": fullName,"image":result.url};
//             const newDoctor = new Doctor(doctor);
//             try{
//                 Doctor.create(newDoctor);
//                 res.status(201).json(newDoctor);
//             }
//             catch(error){
//                 res.status(409).json({message: error.message})
//             }
//         })
//     }else{
//         try{
//             Doctor.create(newDoctor);
//             res.status(201).json(newDoctor);
//         }
//         catch(error){
//             res.status(409).json({message: error.message})
//         }
//     }
// }

export const createDoctor =  (req,res) =>{
    Doctor.findOne({email:req.body.email},(doc,err,done)=>{
        if(doc){
            return done(null,false,{message: "Email already registered"})
        }
    })
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    let fullName = req.body.firstName + " " + req.body.lastName;
    if(req.body.certificate){
        cloudinary.uploader.upload(req.body.certificate, (error,result)=>{
            const doctor = {...req.body,"password": hash,"role": "doctor", fullName,"certificate":result.url};
            if(req.body.image){
                cloudinary.uploader.upload(req.body.image, (error, image_url) =>{
                    const doctor = {image:image_url.url}
                })
            }
            const newDoctor = new Doctor(doctor);
            try{
                Doctor.create(newDoctor);
                res.status(201).json(newDoctor);
            }
            catch(error){
                res.status(409).json({message: error.message})
            }
        })
    }else{
        try{
            Doctor.create(newDoctor);
            res.status(201).json(newDoctor);
        }
        catch(error){
            res.status(409).json({message: error.message})
        }
    }
}


export const findDoctor = async( req,res)=>{
    Doctor.findById(req.params.id).populate("appointments").exec((err,foundDoctor)=>{
        if(err){
            console.error(err);
            res.status(409).json({message: err})
        }else{
            res.status(200).json(foundDoctor)
        }
    })
}

