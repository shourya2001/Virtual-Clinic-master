import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import "react-datepicker/dist/react-datepicker.css";
import dotenv from "dotenv";
import ReactFilestack from "react-filestack";
import { CircularProgress } from "@material-ui/core";

function BookAppointment(props) {
  dotenv.config();

  const [data, setData] = useState("");
  const [allDoctors, setAllDoctors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [value, setValue] = React.useState(new Date("2020-01-01 12:00"));

  const patientId = props.match.params.id;

  const [appointment, setAppointment] = useState({
    doctorName: "",
    patientName: `${data.firstName} ${data.lastName}`,
    date: new Date(),
    startDate: new Date(),
    url: "",
  });

  const displayRazorpay = async () => {
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      currency: "INR",
      amount: 500,
      name: "TrustyMed",
      description: "Wallet Transaction",
      order_id: "order_J6Kii5tRTv0xX1",
      handler: (response) => {
        console.log(response);
      },
      prefill: {
        name: "Anirudh Jwala",
        email: "anirudh@gmail.com",
        contact: "9999999999",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    // bookAppointment();
  };

  const bookAppointment = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/book-appointment/${patientId}`, appointment)
      .then((res) => {
        console.log(appointment);
        props.history.push("/patient-home/" + patientId);
        alert("appointment booked");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
        props.history.push(`/book-appointment/${patientId}`);
        alert("some error occured");
      });
      displayRazorpay();
  };

  useEffect(() => {
    setTimeout(() => {
      async function getDoctors() {
        await axios.get("http://localhost:5000/doctor").then((res) => {
          const response = res.data;
          setAllDoctors(response);
        });
      }
      async function makeRequest() {
        await axios
          .get(`http://localhost:5000/patient/${patientId}`)
          .then((res) => {
            const patient = res.data;
            console.log(patient);
            setData(patient);
          });
      }
      makeRequest();
      getDoctors();
      setIsLoaded(true);
    }, 300);
  }, [patientId]);

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(3),
    },
    datefield: {
      width: "180px",
    },
    docfield: {
      width: "395px",
    },

    buttonUpload: {
      padding: " 8px",
      borderRadius: theme.shape.borderRadius,
      border: "none",
      width: "250px",
      backgroundColor: "#38A3A5",
      color: "#fff",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    fullsize: {
      width: "190px",
    },
  }));

  const classes = useStyles();
  let m = `0${new Date().getMonth().toString()}`;
  let month = m.slice(-2);
  month = `0${(parseInt(month) + 1).toString()}`;
  month = month.slice(-2);
  return (
    <>
      {isLoaded ? (
        <>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h5" color="textSecondary">
                Book an Appointment
              </Typography>
              <form
                className={classes.form}
                noValidate
                // onSubmit={bookAppointment}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="patientName"
                      name="patientName"
                      variant="outlined"
                      value={`${data.firstName} ${data.lastName}`}
                      required
                      fullWidth
                      id="patientName"
                      label="Patient's Name"
                      autoFocus
                      onBeforeInput={(e) =>
                        setAppointment({
                          ...appointment,
                          patientName: e.target.value,
                        })
                      }
                      onChange={(e) => {
                        setAppointment({
                          ...appointment,
                          patientName: e.target.value,
                        });
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="doctorName"
                      select
                      className={classes.docfield}
                      label="Select a specialist to consult"
                      value={appointment.doctorName}
                      onChange={(e) => {
                        setAppointment({
                          ...appointment,
                          doctorName: e.target.value,
                        });
                      }}
                      variant="outlined"
                    >
                      {allDoctors.map((doc) => (
                        <MenuItem key={doc._id} value={doc.fullName}>
                          {doc.fullName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="date"
                      label="Date of appointment"
                      type="date"
                      variant="outlined"
                      value={appointment.date}
                      name="date"
                      className={classes.datefield}
                      inputProps={{
                        min: `${new Date().getFullYear()}-${month}-${new Date().getDate()}`,
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(evt) => {
                        setAppointment({
                          ...appointment,
                          date: evt.target.value,
                        });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="startDate"
                      label="Time of appointment"
                      type="time"
                      variant="outlined"
                      defaultValue="07:30"
                      value={appointment.startDate}
                      className={classes.fullsize}
                      onChange={(e) => {
                        setAppointment({
                          ...appointment,
                          startDate: e.target.value,
                        });
                      }}
                      inputProps={{
                        min: "09:00Z",
                        max: "17:00Z",
                        step: 300,
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ReactFilestack
                      apikey="As9Na4GuRDGAeFOcRfEgqz"
                      mode={"pick"}
                      onSuccess={({ filesUploaded }) => {
                        setAppointment({
                          ...appointment,
                          url: filesUploaded[0].url,
                        });
                      }}
                      onError={(e) => console.log(e)}
                      buttonClass={classes.buttonUpload}
                      buttonText={"Upload Reports"}
                    />
                  </Grid>
                </Grid>
                <Button
                  // type="submit"
                  // fullWidth
                  onClick={bookAppointment}
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: "#22577A", color: "#FFFFFF" }}
                  className={classes.submit}
                >
                  Book an Appointment
                </Button>
                <Button
                  variant="contained"
                  onClick={displayRazorpay}
                  style={{ backgroundColor: "#22577A", color: "#FFFFFF",marginLeft:'10px' }}
                  className={classes.submit}
                >
                  Pay Now
                </Button>
              </form>
            </div>
          </Container>
        </>
      ) : (
        <>
          <CircularProgress style={{ margin: "250px auto" }} />
        </>
      )}
    </>
  );
}

export default BookAppointment;
