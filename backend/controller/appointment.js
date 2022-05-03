import Patient from "../models/patient.js";
import Appointment from "../models/appointment.js";
import Doctor from "../models/doctor.js";
// import bcrypt from "bcrypt";
// import cloud from "cloudinary";
// import multer from "multer";
// import cloudinary from "../middleware/cloudinary.config.js";
// import lodash from "lodash";
import dotenv from "dotenv";
import filestack from "filestack-js";

dotenv.config();
const client = filestack.init(process.env.api_key);

function convertUTCDateToLocalDate(date) {
  var newDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  return newDate;
}

export const createAppointment = (req, res) => {
  let appointment = req.body;
  let date = req.body.date.toString();
  let year = parseInt(date.slice(0, 4));
  let month = parseInt(date.slice(5, 7)) - 1;
  let day = parseInt(date.slice(8, 10));

  let startDate = new Date(
    year,
    month,
    day,
    parseInt(req.body.startDate.slice(0, 2)),
    parseInt(req.body.startDate.slice(-2))
  );
  startDate = convertUTCDateToLocalDate(startDate);
  let endDate = new Date(startDate.getTime() + 30 * 60000);

  date = new Date(
    year,
    month,
    day,
    parseInt(req.body.startDate.slice(0, 2)),
    parseInt(req.body.startDate.slice(-2))
  );

  Patient.findById(req.params.id, (err, foundPatient) => {
    if (err) {
      console.error(err);
    } else if (!foundPatient) {
      res.status(409).json("Patient not found");
    } else {
      let doctorName = req.body.doctorName;
      Doctor.findOne({ fullName: doctorName }, (err, foundDoctor) => {
        if (err) {
          console.error(err);
          res.status(409).json({ message: err });
        } else if (!foundDoctor) {
          res.status(409).json("Doctor not found");
        } else {
          if (req.body.patientName === "undefined undefined") {
            appointment = {
              ...appointment,
              patientName: `${foundPatient.firstName} ${foundPatient.lastName}`,
            };
          }
          appointment = {
            ...appointment,
            startDate,
            endDate,
            patient: foundPatient,
            doctor: foundDoctor,
          };
          const newAppointment = new Appointment(appointment);
          try {
            Appointment.create(newAppointment);
            foundPatient.appointments.push(newAppointment);
            foundDoctor.appointments.push(newAppointment);
            foundPatient.save();
            foundDoctor.save();
            res.status(201).json(newAppointment);
          } catch (error) {
            console.error(error.message);
            res.status(409).json({ message: error.message });
          }
        }
      });
    }
  });
};

export const findAppointment = async (req, res) => {
  Appointment.findById(req.params.id)
    .populate("patient")
    .populate("doctor")
    .exec((err, foundAppointment) => {
      if (err) {
        console.error(err);
        res.status(409).json({ message: err });
      } else {
        res.status(200).json(foundAppointment);
      }
    });
};

export const editAppointment = async (req, res) => {
  Appointment.findById(req.params.id, (err, foundAppointment) => {
    if (err) {
      console.error(err);
      res.status(409).json({ message: err.message });
    } else {
      foundAppointment.patientName = req.body.patientName;
      foundAppointment.doctorName = req.body.doctorName;
      let date = req.body.date.toString();
      let year = parseInt(date.slice(0, 4));
      let month = parseInt(date.slice(5, 7)) - 1;
      let day = parseInt(date.slice(8, 10));
      let startDate = new Date(
        year,
        month,
        day,
        parseInt(req.body.startDate.slice(0, 2)),
        parseInt(req.body.startDate.slice(-2))
      );
      startDate = convertUTCDateToLocalDate(startDate);
      let endDate = new Date(startDate);
      endDate.setHours(today.getHours() + 0.5);
      foundAppointment.startDate = startDate;
      foundAppointment.endDate = endDate;
      foundAppointment.date = date;
      foundAppointment.save();
      res.status(200).json(foundAppointment);
    }
  });
};

export const deleteAppointment = async (req, res) => {
  const id = req.params.id;
  try {
    await Appointment.findByIdAndRemove(id).exec();
    res.send("Successfully Deleted");
  } catch (error) {
    console.error(error);
  }
};
