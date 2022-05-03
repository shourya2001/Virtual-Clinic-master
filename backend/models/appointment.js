import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
    startDate:Date,
    endDate: Date,
    doctorName: String,
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref :"doctor"
    },
    patientName: String,
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref :"patient"
    },
    meetingLink: String,
    date: Date,
    url: String,
    prescription: Object,
    // createdAt: new Date()
})
 
const appointment = mongoose.model('appointment',appointmentSchema);

export default appointment