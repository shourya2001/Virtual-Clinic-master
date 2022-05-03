import React,{useState, useEffect} from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme)=> ({

	card_container: {
		backgroundColor: '#fff',
		minWidth: '350px',
		maxWidth: '600px',
		height: 'auto',
		borderRadius: '14px',
		boxShadow: '0px 10px 30px #22577A',
		margin: '100px auto',
	},
	bold_text:{
		fontWeight: 'bold',
		fontSize: '1.1rem',
		textAlign: 'center',
		padding: '10px 20px 0px 20px',
		marginTop: '-25px',
		marginBottom: '20px',
	},
	normal_text_spec: {
		fontWeight: '600',
		fontSize: '1.1rem',
		color: 'hsl(0, 0%, 50%)',
		textAlign: 'center',
		paddingBottom: '10px',
	},
	normal_text_spec2:{
		fontWeight: '1200',
		fontSize: '1.3rem',
		color: '#000',
		textAlign: 'center',
		paddingBottom: '10px',
		marginLeft: '5px',
	},
	social_container: {
		display: 'flex',
		borderTop: 'solid rgb(206, 206, 206) 1px',
		textAlign: 'center',
	},
	followers: {
		flex: '1'
	},
	likes: {
		flex: '1'
	},
	photos :{
		flex: '1'
	},
	smaller_text :{
		fontWeight: 'normal',
		fontSize: '0.7rem',
		color: 'hsl(0, 0%, 50%)',
		textAlign: 'center',
		letterSpacing: '1px',
		paddingBottom: '20px',
		lineHeight: '5px',
		marginTop: '15px',
	},
	image: {
		margin: 'auto',
		width: '120px',
		height: '120px',
		border: 'solid white 4px',
		borderRadius: '50%',
		marginTop: '30px',
		marginBottom: '25px',
	},
	ava:{
		backgroundColor: '#22577A',
		backgroundPosition: '0px 0px',
		backgroundRepeat: 'no-repeat',
		backgroundSize:' contain',
		textAlign: 'center',
		borderTopLeftRadius: '14px',
		borderTopRightRadius: '14px',
	},

}))

function ProfileCard(props){

  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false)
  const [doctor, setDoctor] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/doctor-home/${props.match.params.id}`)
        .then(res => {

		setTimeout(()=>{
          setDoctor(res.data)
          setIsLoaded(true)

		},300)
        })
    }, [props.match.params.id])

	function getAge(dateString) {
		var today = new Date();
		var birthDate = new Date(dateString);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

	return (
		<>
			{isLoaded?
			<>
			<div className={classes.card_container}>
				<header className={classes.ava}>
					<img src={doctor.image}alt="asjk" className={classes.image}/>
				</header>
				<h1 className="">
					{doctor.fullName}
				</h1>
      		<h4 
			  className={classes.normal_text_spec} 
			  style={{marginTop: '-15px'}}
			>
				Specialisation in:  
				<span className={classes.normal_text_spec2}>{doctor.specialisation}</span>
	  		</h4> 
				<div className={classes.social_container}>
					<div className={classes.followers}>
						<h2 className={classes.smaller_text}>Age</h2>
						<h1 className={classes.bold_text}>{getAge(doctor.dob)} years</h1>
					</div>
					<div className={classes.likes}>
						<h2 className={classes.smaller_text}>Clinic Contact</h2>
						<h1 className={classes.bold_text}>{doctor.clinicContact}</h1>
					</div>
					<div className={classes.photos}>
						<h2 className={classes.smaller_text}>Consultation Fees</h2>
						<h1 className={classes.bold_text}> ₹ {doctor.fee}</h1>
					</div>
				</div>
			</div>
			</>:
			<>
				<CircularProgress style={{margin: '350px auto'}}/>
			</>}
		</>
		
	);
}

export default ProfileCard;