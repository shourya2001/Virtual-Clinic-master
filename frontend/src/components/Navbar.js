import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
    marginLeft: '-950px',
  },
  navlink:{
      marginRight: '10px',
      textDecoration: 'none',
      color: '#fff',
      textUnderlineOffset: 'none'
  },
  bg:{
      backgroundColor: '#22577A',
      borderRadius: '0px'
  },
  allnav:{
      float: 'right',
  }
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.bg}position="static">
        <Toolbar>
          <Typography variant= "h6">Virtual Clinic</Typography>
          <Typography variant="h6" className={classes.title}></Typography>
          <Typography className = {classes.allnav}>
            
            {props.loggedIn? 
            <>
                {props.isPatient?
                <>
                  <Link to ={`/history/${props.id}`} style={{textDecoration: 'none'}}><Button className={classes.navlink}  color="inherit">Recent Appointments</Button></Link>
                  <Button onClick={props.logout} className={classes.navlink}  color="inherit">Logout</Button>
                </>:
                <>
                  <Button href= "" className={classes.navlink}  color="inherit">Schedule</Button>
                  <Button href= "" className={classes.navlink}  color="inherit">Account</Button>
                  <Button onClick={props.logout} className={classes.navlink}  color="inherit">Logout</Button>
                </>
                }
            </> :
            <>
            <Button href= "#precaution" className={classes.navlink}  color="inherit">Precaution</Button>
            <Button href= "#doctorCaro" className={classes.navlink}  color="inherit">Our Specialists</Button>
            <Button href= "/register-doctor" className={classes.navlink}  color="inherit">Register as Doctor</Button>
            <Button href= "/login" className={classes.navlink}  color="inherit">Login</Button>
            </>
            }
          </Typography>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}