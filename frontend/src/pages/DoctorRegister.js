import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Container from '@material-ui/core/Container';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "../Axios";
import {validatePassword, validateEmail} from '../helper/validate.js'

import ReactFilestack from 'react-filestack'

const useStyles = makeStyles((theme) => ({
  radio:{
    '&$checked':{
      color: '#22577A'
    }
  },
  checked: {},
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#3f51b5',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert:{
    width: '400px',
    marginTop: '10px',
  },
  aligncenter:{
    display:'flex',
    justifyContent:' center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: '5px',
    marginBottom: '10px',
    marginLeft: '-5px',
  },
  gendergroup:{
    display: 'flex',
    float: 'right',
    marginLeft: '30px'
  },
  clearance:{
    marginBottom: '200px',
  },
  genderlabel:{
    display:'flex',
    float:'left',
    marginTop: '0px',
    marginLeft: '15px'
  },
  fullsizepass:{
    width: '395px',
  },
  buttonUpload:{
    padding:' 8px',
    borderRadius: theme.shape.borderRadius,
    border: 'none',
    width: '250px',
    backgroundColor: '#38A3A5',
    color: '#fff',
  },
  shiftup:{
    marginTop: '0px',
    width: '190px',
  },
  warning:{
    marginTop: '15px',
  },
  upload:{
    marginTop: '2px',
    marginLeft: '10px',
    marginBottom: '0px',
  },
}));

export default function SignUp(props) {

  const classes = useStyles();

  const [doctor,setDoctor] = useState({
    firstName: '',
    lastName: '',
    email:'',
    password: '',
    dob:new Date(),
    clinicContact: '',
    gender: '',
    specialisation:'',
    image: '',
    fee: '',
  });

  const handleChange = (e)=>{
    setDoctor({...doctor, [e.target.name]: e.target.value});
  }

  const [emailError, setEmailError] = useState('')
  const [showPassword,setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const createDoctor= (evt) =>{
    evt.preventDefault();
    axios.post('http://localhost:5000/register-doctor',doctor).then((req,response)=>{
      props.history.push('/login')
      }).catch((error)=>{
          console.log(error);
          setEmailError('Email already exists')
          props.history.push('/register-doctor')
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4" color="textSecondary" className={classes.textdeco}>
          Sign up as Specialist
        </Typography>
        {emailError && <Alert className={classes.alert} severity="error">{emailError}</Alert>}
        <form className={classes.form} noValidate  encType='multipart/form-data' onSubmit={createDoctor}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={doctor.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={doctor.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                // autoComplete="email"
                value={doctor.email}
                onChange={(e)=>{handleChange(e);
                  window.errorEmail = (validateEmail(e.target.value));
                }}
              />
              {window.errorEmail && (window.errorEmail==="Enter valid Email!"? 
                <Alert className={classes.warning} severity="warning">{window.errorEmail}</Alert> :
                <Alert className={classes.warning} severity="success">{window.errorEmail}</Alert>)}              
            </Grid>
            <Grid item xs={12}>
            <FormControl className={classes.fullsizepass} variant="outlined">
              <InputLabel htmlFor="outlined">Password</InputLabel>
              <OutlinedInput
              fullWidth
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={doctor.password}
                
                onChange={(evt)=>{
                  window.errorPassword = (validatePassword(evt.target.value));
                  setDoctor({
                      ...doctor, password: evt.target.value
                  })
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={160}
              />
            </FormControl>
            {window.errorPassword && (window.errorPassword==="Password is weak"?
              <Alert className={classes.warning} severity="warning">{window.errorPassword}</Alert> : 
              <Alert className={classes.warning} severity="success">{window.errorPassword}</Alert>) }
            </Grid>
            
            <Grid item xs ={12} sm={6}>

              <TextField
                id="date"
                label="Date of Birth"
                type="date"
                variant="outlined"
                value={doctor.dob}
                name="dob"
                className={classes.shiftup}
                inputProps={{
                  max: "2001-12-31"
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(evt)=> {
                  setDoctor({...doctor, dob: evt.target.value})
                  
                }}
              />

            </Grid>
            <Grid item xs ={12} sm={6}>
            <TextField
                className={classes.shiftup}
                variant="outlined"
                required
                fullWidth
                name="clinicContact"
                label="Clinic Contact"
                id="clinicContact"
                autoComplete="clinicContact"
                value={doctor.clinicContact}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="specialisation"
                label="Your specialisation"
                name="specialisation"
                autoComplete="specialisation"
                value={doctor.specialisation}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs ={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              type="text"
              id="fee"
              label="Consultation Fees (₹)"
              name="fee"
              autoComplete="fee"
              onChange={handleChange}
            />
            </Grid>
            <Grid item xs ={12}>
              <ReactFilestack 
                apikey="As9Na4GuRDGAeFOcRfEgqz"
                mode={'pick'}
                onSuccess={({ filesUploaded }) => setDoctor({...doctor, image: filesUploaded[0].url })}
                onError={(e) => console.log(e)}
                buttonText={'Upload Profile Picture'}
                buttonClass={classes.buttonUpload}
              />
            </Grid>
            <Grid className={classes.aligncenter}>
              <FormLabel className={classes.genderlabel} component="legend" >Gender :</FormLabel>
              <RadioGroup row className={classes.gendergroup} aria-label="gender" name="gender" value={doctor.gender} onChange={(e)=> {setDoctor({...doctor, gender: e.currentTarget.value})}}>
                <FormControlLabel className={{root: classes.formControlLabelRoot, label: classes.formControlLabel}} value="female" control={<Radio classes={{root: classes.radio, checked: classes.checked}} />} label="Female" />
                <FormControlLabel className={{root: classes.formControlLabelRoot, label: classes.formControlLabel}} value="male" control={<Radio classes={{root: classes.radio, checked: classes.checked}} />} label="Male" />
                <FormControlLabel className={{root: classes.formControlLabelRoot, label: classes.formControlLabel}} value="other" control={<Radio classes={{root: classes.radio, checked: classes.checked}} />} label="Other" />
              </RadioGroup >
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{backgroundColor: '#22577A', color: '#FFFFFF'}}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/login" variant="body2" color="inherit">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}