import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/" style={{textDecoration : 'none'}}>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  add:{
    width: '235px',  
    marginLeft: '90px',
    marginTop: '10px'
  },
  medicineField:{
    position: 'relative',
    marginLeft: '-2px',
    marginBottom: '10px',
  },

  eachInput:{
    marginTop: '30px'
  },
  instructionField:{
    width: '322px',
    marginLeft: '-2px',
  },
  deleteButton:{
    height: '55px',
    marginLeft: '10px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Prescription(props) {
  const classes = useStyles();

  const [fields, setFields] = useState({ 
    diagnosis: '',
    medicine : [{
      value: '' ,
      instruction : '',
    }]

  });

  const [data,setData] = useState('')
  
  const appointmentId = props.match.params.id
  useEffect(() => {
    async function getAppointment(){
      await axios.get(`http://localhost:5000/meeting/${appointmentId}`).then((res)=>{
          const response = res.data;
          setData(response)
      }).catch((err)=>{
        console.log(err);
      })
  }

  getAppointment();
  }, [])

  function handleChangeValue(i, event) {
    const spread = {...fields};
    const values = [...spread.medicine];
    values[i].value = event.target.value
    setFields({...fields,medicine: values});
  }
  function handleChangeInstruction(i, event) {
    const spread = {...fields};
    const instructions = [...spread.medicine];
    instructions[i].instruction = event.target.value
    setFields({...fields,medicine: instructions});
  }

  function handleDiagnosis(e) { 
    let diagnosis = {...fields,diagnosis:e.target.value}
    setFields(diagnosis)
  }

  function handleAdd() {
    const spread = {...fields};
    const values = [...spread.medicine]
    values.push({ value: null });
    setFields({...fields, medicine : values});
  }

  function handleRemove(i) {
    const spread = {...fields};
    const values = [...spread.medicine]
    values.splice(i, 1);
    setFields({...fields, medicine: values});
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios.put(`http://localhost:5000/add-prescription/${appointmentId}`,fields).then((res)=>{
      if(res){
        alert('prescription made');
        props.history.goBack()
      }
    }).catch((err)=>{
      console.log(err);
      props.history.push(`/prescription/${appointmentId}`)
    })
  }

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
                 value = {new Date(data.date).toLocaleString().slice(0,9)}
                 autoComplete="date"
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
              onChange={e => handleDiagnosis(e)}
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
                  onChange={e => handleChangeValue(idx, e)}
                />
                <TextField
                  variant="outlined"
                  id="Instructions"
                  label="Instructions"
                  type="text"
                  required
                  multiline
                  value={field.instruction || ""}
                  className={classes.instructionField}
                  onChange={e => handleChangeInstruction(idx, e)}
                />

                <Button type="button" style={{backgroundColor: '#f50057', color: '#fff'}} className={classes.deleteButton} onClick={() => handleRemove(idx)}>
                  <DeleteIcon className={classes.deleteIcon}/>
                </Button>
              </div>
            );
          })}
            </Grid>
              <Button
                type="button"
                variant="contained"
                style={{backgroundColor: '#38A3A5', color: '#fff'}}
                className={classes.add}
                onClick={() => handleAdd()}
              >
                <AddIcon/>Click to add medicine
              </Button>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{backgroundColor: '#22577A', color: '#fff'}}
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