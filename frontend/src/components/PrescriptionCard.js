import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    height: "auto",
    margin: "150px auto",
    border: "1px solid #b2b2b2",
    backgroundColor: "#fff",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 38,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function PrescriptionCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [appointment, setAppointment] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [prescription, setPrescription] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // document.body.style.backgroundColor = "#22577A";
    axios
      .get(`http://localhost:5000/meeting/${props.match.params.id}`)
      .then((res) => {
        setTimeout(() => {
          const app = res.data;
          setAppointment(app);
          setDoctor(app.doctor);
          setPrescription(app.prescription);
          setMedicines(app.prescription.medicine);
          setIsLoaded(true);
        }, 300);
      });
  }, []);

  return (
    <>
      {isLoaded ? (
        <>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Prescribed
              </Typography>
              <Typography
                variant="h6"
                component="h2"
                style={{ marginTop: "-15px" }}
              >
                by Dr. {appointment.doctorName}
              </Typography>
              <Typography
                variant="h6"
                component="h2"
                style={{
                  marginTop: "45px",
                  width: "580px",
                  marginLeft: "-55px",
                }}
              >
                Diagnosis: {prescription.diagnosis}
              </Typography>
              <Typography variant="body2" component="p">
                <ul style={{ marginTop: "10px" }}>
                  {medicines.map((med) => (
                    <p
                      style={{
                        width: "500px",
                        marginLeft: "-55px",
                        marginBottom: "10px",
                      }}
                    >
                      <p style={{ display: "inline-block" }}>Medicine: </p>
                      <p
                        style={{
                          display: "inline-block",
                          fontWeight: "700",
                          marginLeft: "8px",
                        }}
                      >
                        {" "}
                        {med.value}
                      </p>
                      <br />
                      <p
                        style={{ display: "inline-block", marginTop: "-20px" }}
                      >
                        Instructions:
                      </p>
                      <p
                        style={{
                          display: "inline-block",
                          marginTop: "-20px",
                          fontWeight: "700",
                          marginLeft: "8px",
                        }}
                      >
                        {med.instruction}
                      </p>
                    </p>
                  ))}
                </ul>
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                style={{
                  backgroundColor: "#22577A",
                  color: "#fff",
                  margin: "0px auto",
                  padding: "10px 10px",
                  marginBottom: "20px",
                  fontWeight: "500",
                  marginTop: "-25px",
                }}
              >
                Call {doctor.clinicContact} for help
              </Button>
            </CardActions>
          </Card>
        </>
      ) : (
        <>
          <CircularProgress style={{ margin: "250px auto" }} />
        </>
      )}
    </>
  );
}
