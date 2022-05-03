import React,{useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Navbar from '../components/Navbar'
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import CardMedia from '@material-ui/core/CardMedia';
import SearchBar from '../components/SearchBar';
import DoctorCarousel from '../components/DoctorCarousel';
import Footer from '../components/Footer';
import images from '../helper/images'
import { CircularProgress } from '@material-ui/core';


  const useStyles = makeStyles((theme)=> ({
    root: {
      width: '320px',
      display: 'inline-block',
      marginRight: '20px',
      border: '1px solid #b2b2b2'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    media: {
        height: 150,
        width: 355,
        marginBottom: '5px'
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    contain:{
        marginTop: '-30px',
        marginRight: '20px',
        marginLeft: '20px'
    },
    aligncenter:{
        marginLeft: '120px'
    },
    button: {
        margin: theme.spacing(1),
    },
  }));

function PatientHome(props) {

    const[data, setData] = useState('');
    const[appointments, setAppointments] = useState([]);
    const [isLoaded,setIsLoaded] = useState(false)

    const deleteAppointment = (id) =>{
        axios.delete(`http://localhost:5000/delete/${id}`).then(()=>{
            window.location.reload(false);
        })
    }

    const patientId = props.match.params.id

    useEffect(()=>{
        setTimeout(()=>{
            function makeRequest() {
               axios.get(`http://localhost:5000/patient/${patientId}`).then ((res)=>{
                   const response = res.data;
                   setData(response);
                   setAppointments(response.appointments)
               })
            }
            makeRequest();
            setIsLoaded(true)
        },300)
    },[patientId]);

    function logout(){
        axios.get("http://localhost:5000/logout").then((res)=>{
            props.history.push('/')
        })
    }

    let id = data._id;
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const appoint = appointments.slice(0,4);
    let disable = true;

    return (
        <div>
            <Navbar loggedIn={true} logout={logout} isPatient={true} id={props.match.params.id}/>
            <h2>Hello,  {data.firstName} {data.lastName} ! </h2>
            <SearchBar id ={id} isLoggedIn ={true} {...props}/>
            <div className={classes.contain}>
                <Typography variant="h4" style={{color: '#000', marginBottom: '20px'}} component="p">
                    Your recent appointments
                </Typography>
                <>
                {isLoaded?
                <>
                    {appoint.length ===0 ?
                    <>
                        <Card className={classes.root} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Oops! You have not booked any appointments yet
                            </Typography>
                            <Typography variant="h5" component="h2">
                            {/* be{bull}nev{bull}o{bull}lent */}
                            </Typography>
                            <Typography variant="h5" component="p"  style={{marginTop: '10px'}}>
                            Kindly book an appointment to view recents
                            </Typography>
                        </CardContent>
                        </Card>
                    </>:
                    <>
                    {appoint.map((app)=> (
                            <>
                            {app.date <= new Date()? disable=true : disable= false}
                            {/* <h1>{disable}</h1> */}
                            <Card className={classes.root}>
                            {/* <CardActionArea> */}
                            <CardMedia
                                component="img"
                                alt="doctor image"
                                className={classes.media}
                                height="140"
                                image={images[Math.floor(Math.random()*images.length)]}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                {app.doctorName}
                                </Typography>
                                <Typography variant="h6" color="textSecondary" component="p">
                                    {new Date(app.startDate).toLocaleDateString(undefined, {day:'2-digit'}) + '-' + new Date(app.startDate).toLocaleDateString(undefined, {month:'short'}) + '-' + new Date(app.startDate).toLocaleDateString(undefined, {year:'numeric'})} {bull} {app.startDate.toString().slice(11,16)}
                                </Typography>
                                {app.prescription?
                                <>
                                <Button 
                                    variant="contained" 
                                    style={{backgroundColor:"#38A3A5",marginTop:'10px', marginBottom: '-10px',fontWeight: '500',color: '#fff'}} 
                                    className={classes.button} 
                                    href={`/view-prescription/${app._id}`} 
                                >
                                    View Prescription
                                </Button>
                                </>:
                                <>
                                <Button 
                                    variant="contained" 
                                    style={{backgroundColor:"#b2b2b2",marginTop:'10px', marginBottom: '-10px',fontWeight: '500',color: '#000'}} 
                                    className={classes.button} 
                                    disabled
                                >
                                    View Prescription
                                </Button>
                                </>
                                }
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<DeleteIcon />}
                                    onClick={()=> deleteAppointment(app._id)}
                                    disabled={disable}
                                >
                                    Delete
                                </Button>
                                <Button 
                                    style={{marginLeft:"-2px"}} 
                                    href={`/meeting/${app._id}`} 
                                    style={{backgroundColor:"#22577A",color: '#fff'}} 
                                    variant="contained" 
                                >
                                    Link
                                </Button>
                                <Button 
                                    variant="contained" 
                                    style={{backgroundColor:"#ffc107"}} 
                                    className={classes.button} 
                                    startIcon={<EditIcon />} 
                                    href={`/edit-appointment/${app._id}`} 
                                >
                                    Edit
                                </Button>
                            </CardActions>
                        </Card>
                        </>

                    ))}
                    </>
                    }
                
                </>:
                    <>
                    <CircularProgress />
                    </>
            }
            </>
            </div>
            <>
                <DoctorCarousel id={id} loggedIn={true}/>
                <Footer/>
            </>
        </div>
    )
}

export default PatientHome



