import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import axios from '../Axios.js';

import {validatePassword, validateEmail} from '../helper/validate.js'


const useStyles = makeStyles((theme) => ({
  radio:{
    '&$checked':{
      color: '#22577A'
    }
  },
  checked: {},
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  warning:{
    marginTop: '15px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  dobField:{
    marginLeft: '-5px',
    width: '185px'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  aligncenter:{
    display:'flex',
    justifyContent:' center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: '5px',
    marginBottom: '10px',
  },
  gendergroup:{
    display: 'flex',
    float: 'right',
    marginLeft: '30px'
  },
  genderlabel:{
    display:'flex',
    float:'left',
    marginTop: '0px',
    marginLeft: '10px'
  },
  alert:{
    width: '400px',
    marginTop: '10px',
  },
  fullsizepass:{
    width: '395px',
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  
  const [emailError, setEmailError] = useState('')
  const [showPassword,setShowPassword] = useState(false)
  
  const [patient,setPatient] = useState({
    firstName: '',
    lastName: '',
    email:'',
    password: '',
    dob: new Date(),
    phoneNumber: '',
    gender: '',
    });

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleChange = (e)=>{
      setPatient({...patient, [e.target.name]: e.target.value});
    }

  const createPatient = (evt) =>{
    evt.preventDefault();
    axios.post('http://localhost:5000/register-patient',patient).then((response)=>{
        props.history.push('/login')
      }).catch((error)=>{
        if(error.response.status === 409){
          setEmailError('Email already exists')
        }
          props.history.push('/register-patient');

      })
  }

    return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4" color="textSecondary" >
          Sign up as Patient
        </Typography>
        {emailError && <Alert className={classes.alert} severity="error">{emailError}</Alert>}
        <form className={classes.form} noValidate onSubmit={createPatient}>
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
                value={patient.firstName}
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
                value={patient.lastName}
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
                autoComplete="email"
                value={patient.email}
                onChange={e => 
                          	{
                            	handleChange(e) ; 
                            	window.errorEmail = (validateEmail(e.target.value));
                          	}
                        }
              />
           {window.errorEmail && (window.errorEmail==="Enter valid Email!"? <Alert className={classes.warning} severity="warning">{window.errorEmail}</Alert> : <Alert className={classes.warning} severity="success">{window.errorEmail}</Alert>) }
            </Grid>
            <Grid item xs={12}>
            <FormControl className={classes.fullsizepass} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={patient.password}
                onChange={(evt)=>{
                  window.errorPassword = (validatePassword(evt.target.value));
                  setPatient({
                      ...patient, password: evt.target.value
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
                labelWidth={120}
              />
            </FormControl>
            {window.errorPassword && (window.errorPassword==="Password is weak"? <Alert className={classes.warning} severity="warning">{window.errorPassword}</Alert> : <Alert className={classes.warning} severity="success">{window.errorPassword}</Alert>) }
            </Grid>
            <Grid item xs ={12} sm={6}>
            <TextField
              variant="outlined"
              id="date"
              label="Date of Birth"
              type="date"
              value={patient.dob}
              className={classes.dobField}
              inputProps={{
                min: new Date()
              }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(evt)=> setPatient({...patient,dob: evt.target.value})}
            />
            </Grid>
            <Grid item xs ={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              autoComplete="phoneNumber"
              value={patient.phoneNumber}
              onChange={handleChange}
            />
            </Grid>
            <Grid className={classes.aligncenter}>
            <FormLabel className={classes.genderlabel} component="legend" >Gender:</FormLabel>
            <RadioGroup row className={classes.gendergroup} aria-label="gender" name="gender1" value={patient.gender} onChange={(e)=> setPatient({...patient, gender: e.currentTarget.value})}>
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
              <Link href="/login" variant="body2" color="inherit" >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}