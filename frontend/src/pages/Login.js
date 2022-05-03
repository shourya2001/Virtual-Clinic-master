import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from '../Axios.js';
import { ErrorHandler} from 'universal-react-logger';
import Navbar from '../components/Navbar'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Clinic Name
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
    backgroundColor: '#22577A',
  },
  form: {
    width: '90%', 
    marginTop: theme.spacing(1),
  },
  aligncenter:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  fullsizepass:{
    width: '355px'
  },
  topmargin:{
    marginTop: '10px',
  },
  alert: {
    width: '390px',
    marginTop: '-50px',
    marginBottom: '20px'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const classes = useStyles();
  
  const [user,setUser]= useState({
    email : '',
    password: '',
  })

  const [error,setError] = useState('')
  const [showPassword,setShowPassword] = useState(false)

  const handleSubmit = (evt)=>{
    evt.preventDefault();
      axios.post("http://localhost:5000/login",user).then((response)=>{
        if(response.data){
          const currentRole = response.data.role;
          props.history.push(`${currentRole}-home/${response.data._id}`)
        }else{
          props.history.push("/login")
        }
      }).catch((error)=>{
          console.log(error);
          props.history.push("/login")
          // props.setEventError(error)
          setError('Invalid email or password')
      })
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <>
    <Navbar/>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      {error && <Alert className={classes.alert} severity="error">{error}</Alert>}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" color="textSecondary">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={user.email}
            onChange={(evt)=>{
                setUser({
                    ...user, email: evt.target.value
                })
            }}
          />
          <FormControl className={classes.fullsizepass} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            fullWidth
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={user.password}
            onChange={(evt)=>{
              setUser({
                  ...user, password: evt.target.value
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

          {/* <FormControlLabel
          className={classes.topmargin}
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{backgroundColor: '#22577A', color: '#FFFFFF'}}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container className={classes.aligncenter}>
            <Grid item xs>
              <Link href= "/register-patient" variant="body2" color="inherit">
              Register as patient
              </Link>
            </Grid>
            <Grid item xs>
              <Link href="/register-doctor" variant="body2" color="inherit">
                {"Register as doctor"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </>
  );
}

export default ErrorHandler(Login, true);