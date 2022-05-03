import Doctor from '../models/doctor.js'
import Patient from '../models/patient.js'
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.status(409).json("Please login to continue")
}

middlewareObj.checkPatientOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Patient.findById(req.params.id, function(err, foundPatient){
            if(err){
                console.log(err);
                res.status(409).json({message:err.message})
            } else{
                if(foundPatient.id.equals(req.user._id)){
                    next();
                }else{
                    res.status(409).json({message:"You are not authorized"})
                }
            }
        });
    }else{
        res.status(409).json({message:"Please login to continue"})
    }
}

export default middlewareObj;
