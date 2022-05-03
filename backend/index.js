import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import passportLocal from "passport-local";
import patientRegisterRoute from "./routes/patientRegister.js";
import doctorRegisterRoute from "./routes/doctorRegister.js";
import doctorRoute from "./routes/doctor.js";
import loginRoute from "./routes/login.js";
import createAppointmentRoute from "./routes/createAppointment.js";
import doctorHomeRoute from "./routes/doctorhome.js";
import patientRoute from "./routes/patient.js";
import prescriptionRoute from "./routes/prescription.js";
import Patient from "./models/patient.js";
import Doctor from "./models/doctor.js";
import expressSession from "express-session";
import bcrypt from "bcrypt";
import http from "http";
import { Server } from "socket.io";
import appointment from "./routes/appointment.js";

var LocalStrategy = passportLocal.Strategy;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
// const CONNECTION_URL = "mongodb+srv://admin:tJ2AoR50nzohb06h@cluster0.rhgoj.mongodb.net/Virtual_Clinic?retryWrites=true&w=majority";
// const CONNECTION_URL = "mongodb+srv://admin:4XzlDSaCNNmiY4N9@cluster0.rhgoj.mongodb.net/Virtual_Clinic?retryWrites=true&w=majority";
const CONNECTION_URL =
  "mongodb+srv://admin:qW7k1cR5BNowH4lJ@cluster0.rhgoj.mongodb.net/Virtual_Clinic?retryWrites=true&w=majority";

app.use(passport.initialize());
app.use(passport.session());

app.use("/register-patient", patientRegisterRoute);
app.use("/register-doctor", doctorRegisterRoute);
app.use("/doctor", doctorRoute);
app.use("/", loginRoute);
app.use("/book-appointment", createAppointmentRoute);
app.use("/doctor-home", doctorHomeRoute);
app.use("/patient", patientRoute);
app.use("/", appointment);
app.use("/", prescriptionRoute);

app.use(
  express({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false,
  })
);

passport.use(
  "patient-local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      Patient.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "Email address not registered",
            });
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        })
        .catch((err) => done(null, false, { message: err.message }));
    }
  )
);

passport.use(
  "doctor-local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      Doctor.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "Email address not found" });
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        })
        .catch((err) => done(null, false, { message: err.message }));
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, { _id: user.id, role: user.role });
});

passport.deserializeUser((login, done) => {
  if (login.role === "patient") {
    Patient.findById(login, function (err, patient) {
      if (patient) done(null, patient);
      else done(err, { message: "Patient not found" });
    });
  } else if (login.role === "doctor") {
    Doctor.findById(login, (err, doctor) => {
      if (doctor) done(null, doctor);
      else done(err, { message: "Doctor not found" });
    });
  } else {
    done({ message: "No entity found" }, null);
  }
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/log-client-errors", (req, res) => {
  let error = req.body.error.message;
  let errorInfo = req.body.error.stack;
  console.log(errorInfo);
  console.log(error);
  // send these errors to some service or to a logger (ex: winston)
  //ex: logger.error(`The app received a new client log: ${error} ${errorInfo}`);

  res.status(200);
});

const rooms = {};

io.on("connection", (socket) => {
  socket.on("join room", (roomID) => {
    if (rooms[roomID]) {
      rooms[roomID].push(socket.id);
    } else {
      rooms[roomID] = [socket.id];
    }
    const otherUser = rooms[roomID].filter((id) => id !== socket.id);
    if (otherUser) {
      socket.emit("other user", otherUser);
      socket.to(otherUser).emit("user joined", socket.id);
    }
  });

  socket.on("offer", (payload) => {
    io.to(payload.target).emit("offer", payload);
  });

  socket.on("answer", (payload) => {
    io.to(payload.target).emit("answer", payload);
  });

  socket.on("ice-candidate", (incoming) => {
    io.to(incoming.target).emit("ice-candidate", incoming.candidate);
  });
});

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    server.listen(PORT, () =>
      console.log(
        `Connection to mongoDB is established and is now listening on port : ${PORT}`
      )
    )
  )
  .catch((err) => console.log(err));
