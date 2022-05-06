import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Chip from "@material-ui/core/Chip";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://material-ui.com/"
        style={{ textDecoration: "none" }}
      >
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
  add: {
    width: "235px",
    marginLeft: "90px",
    marginTop: "10px",
  },
  medicineField: {
    position: "relative",
    marginLeft: "-2px",
    marginBottom: "10px",
  },

  eachInput: {
    marginTop: "30px",
  },
  instructionField: {
    width: "322px",
    marginLeft: "-2px",
  },
  deleteButton: {
    height: "55px",
    marginLeft: "10px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const instructions = [
  "Before Breakfast",
  "After Breakfast",
  "Before Lunch",
  "After Lunch",
  "Before Dinner",
  "After Dinner",
];

export default function Prescription(props) {
  const classes = useStyles();

  const [fields, setFields] = useState({
    diagnosis: "",
    symptoms: [],
    notes: [],
    medicine: [
      {
        value: "",
        instruction: [],
        duration: 0,
        frequency: "",
      },
    ],
  });

  const [data, setData] = useState("");

  const appointmentId = props.match.params.id;
  useEffect(() => {
    async function getAppointment() {
      await axios
        .get(`http://localhost:5000/meeting/${appointmentId}`)
        .then((res) => {
          const response = res.data;
          setData(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getAppointment();
  }, []);

  function handleChangeValue(i, event) {
    const spread = { ...fields };
    const values = [...spread.medicine];
    values[i].value = event.target.value;
    setFields({ ...fields, medicine: values });
  }
  function handleChangeInstruction(i, event) {
    const spread = { ...fields };
    const instructions = [...spread.medicine];
    instructions[i].instruction = event.target.value;
    setFields({ ...fields, medicine: instructions });
    console.log(fields);
  }

  function handleChangeDuration(i, event) {
    const spread = { ...fields };
    const durations = [...spread.medicine];
    durations[i].duration = event.target.value;
    setFields({ ...fields, medicine: durations });
  }

  function handleDiagnosis(e) {
    let diagnosis = { ...fields, diagnosis: e.target.value };
    setFields(diagnosis);
  }
  function handleSymptoms(e) {
    // let symptoms = { ...fields, symptoms: e.target.value };
    const symptoms_array = e.target.value.split(",").map((symptom) => {
      return symptom.trim(" ");
    });
    let symptoms = { ...fields, symptoms: symptoms_array };
    // console.log(symptoms_array)
    setFields(symptoms);
  }

  function handleAdd() {
    const spread = { ...fields };
    const values = [...spread.medicine];
    values.push({ value: null });
    setFields({ ...fields, medicine: values });
  }

  function handleRemove(i) {
    const spread = { ...fields };
    const values = [...spread.medicine];
    values.splice(i, 1);
    setFields({ ...fields, medicine: values });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios
      .put(`http://localhost:5000/add-prescription/${appointmentId}`, fields)
      .then((res) => {
        if (res) {
          alert("prescription made");
          props.history.goBack();
        }
      })
      .catch((err) => {
        console.log(err);
        props.history.push(`/prescription/${appointmentId}`);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Prescription
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                variant="outlined"
                required
                fullWidth
                disabled
                value={`${data.patientName}`}
                id="patientName"
                label="Patient Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                disabled
                fullWidth
                id="date"
                label="Date"
                name="date"
                value={new Date(data.date).toLocaleString().slice(0, 9)}
                autoComplete="date"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="symptoms"
                label="Symptoms"
                type="text"
                name="symptoms"
                required
                multiline
                onChange={(e) => handleSymptoms(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="Diagnosis"
                label="Diagnosis"
                type="text"
                name="diagnosis"
                required
                multiline
                onChange={(e) => handleDiagnosis(e)}
              />
            </Grid>
            <Grid item xs={12}>
              {fields.medicine.map((field, idx) => {
                return (
                  <div className={classes.eachInput} key={`${field}-${idx}`}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      type="text"
                      id="medicineName"
                      className={classes.medicineField}
                      label="Enter the name of medicine"
                      value={field.value || ""}
                      onChange={(e) => handleChangeValue(idx, e)}
                    />
                    <TextField
                      variant="outlined"
                      id="duration"
                      label="Duration"
                      type="number"
                      fullWidth
                      required
                      multiline
                      value={field.duration || ""}
                      className={classes.instructionField}
                      onChange={(e) => handleChangeDuration(idx, e)}
                    />
                    {/* <TextField
                      variant="outlined"
                      id="Instructions"
                      label="Instructions"
                      type="text"
                      required
                      multiline
                      value={field.instruction || ""}
                      className={classes.instructionField}
                      onChange={(e) => handleChangeInstruction(idx, e)}
                    /> */}
                    <div>
                      <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-chip-label">
                          Chip
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-chip-label"
                          id="demo-multiple-chip"
                          multiple
                          value={field.instruction || []}
                          // onChange={handleChange}
                          onChange={(e) => handleChangeInstruction(idx, e)}
                          input={
                            <OutlinedInput
                              id="select-multiple-chip"
                              label="Chip"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          // MenuProps={MenuProps}
                        >
                          {instructions.map((instruction) => (
                            <MenuItem
                              key={instruction}
                              value={instruction}
                              // style={getStyles(name, personName, theme)}
                            >
                              {instruction}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <Button
                      type="button"
                      style={{ backgroundColor: "#f50057", color: "#fff" }}
                      className={classes.deleteButton}
                      onClick={() => handleRemove(idx)}
                    >
                      <DeleteIcon className={classes.deleteIcon} />
                    </Button>
                  </div>
                );
              })}
            </Grid>
            <Button
              type="button"
              variant="contained"
              style={{ backgroundColor: "#38A3A5", color: "#fff" }}
              className={classes.add}
              onClick={() => handleAdd()}
            >
              <AddIcon />
              Click to add medicine
            </Button>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#22577A", color: "#fff" }}
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
