import React,{useState, useEffect} from 'react';
import Carousel from "react-elastic-carousel";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import {Link} from 'react-router-dom'

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '300px',
    border: '1px solid #b2b2b2',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#22577A',
  },
  center:{
    marginRight: '40px',
  },
  title:{
    marignTop: '-50px',
    marginBottom: '40px'
  },
  carocontainer:{
    marginTop: '-20px'
  },
  contain:{
      marginTop: '45px',
      marginRight: '20px',
      marginLeft: '20px',
      marginBottom: '20px',
  },
  
}));



function DoctorCarousel(props) {

    
  const [allDoctors, setAllDoctors] = useState([]);


  useEffect(()=>{

      async function getDoctors(){
          await axios.get("http://localhost:5000/doctor").then((res)=>{
              const response = res.data;
              setAllDoctors(response);
          })
      }

      getDoctors();

  },[]);

  const classes = useStyles();

  return (
    <>
            <div  id ="doctorCaro" className={classes.contain}>
            <Typography variant="h4" style={{color: '#000'}} component="p" className={classes.title}>
                Our Specialists
            </Typography>
            <div className={classes.carocontainer}>
            <Carousel  breakPoints={breakPoints}>
                {allDoctors.map((doc)=> (
                    
                    <Card className={classes.root} key={doc._id}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="doctor" className={classes.avatar}>
                          {doc.fullName.charAt(0).toUpperCase()}
                        </Avatar>
                      }
                      className={classes.center}
                      title={doc.fullName}
                      subheader={`Specialized in: ${doc.specialisation}`}
                    />
                    <CardMedia
                      className={classes.media}
                      image={doc.image}
                    />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {props.loggedIn?
                        <>
                          <Link to={`/book-appointment/${props.id}`} style={{textDecoration: 'none'}}>
                          <Button variant="contained" style={{backgroundColor: '#22577A', color: '#fff'}}>Book an appointment</Button>
                          </Link>
                        </>:
                        <>
                         <Link to="/login" style={{textDecoration: 'none'}}>
                          <Button variant="contained" style={{backgroundColor: '#22577A', color: '#fff'}}>Book an appointment</Button>
                          </Link>
                        </>}
                      
                      </Typography>
                    </CardContent>
                  </Card>
               
                ))}
                  </Carousel>
                  </div>
            </div>
    </>
  )
}

export default DoctorCarousel
