import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Title from './Title';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders(props) {
    const [appointments, setAppointments] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        axios.get(`http://localhost:5000/doctor-home/${props.id}`)
        .then(res => {
          setTimeout(()=>{
            const appointment = res.data.appointments;
            setAppointments(appointment.sort(function(a,b){return new Date(b.date) - new Date(a.date);}))
            setIsLoaded(true)
          },300)
  
        })
    }, [props.id])

  const getMonthNumber=(date)=>{
    let m = `0${new Date(date).getMonth().toString()}`
    let month = m.slice(-2)
    month = `0${(parseInt(month)+1).toString()}`
    month = month.slice(-2)
    return month
  }

  const classes = useStyles();
  return (
    <>
      {isLoaded?
      <>
      <React.Fragment>
        <Title>Recent Appointments</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>View Reports</TableCell>
              <TableCell align="right">Prescription</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((app) => (
              <TableRow key={app.id}>
                <TableCell> 
                  {`${new Date(app.date).getDate()}/${getMonthNumber(app.date)}/${new Date(app.date).getFullYear()}`}
                </TableCell>
                <TableCell>{app.startDate.toString().slice(11,16)}</TableCell>
                <TableCell>{app.patientName}</TableCell>
                {app.url?
                  <TableCell>
                        <Button style={{backgroundColor: '#22577A', color: '#FFFFFF'}} href={`${app.url}`} target="_blank">
                          View Reports
                        </Button>
                  </TableCell>:
                  <TableCell style={{marginLeft: '80px'}}>- </TableCell>}
                {app.prescription?
                <TableCell align="right">
                  <Link to ={`/view-prescription/${app._id}`} style={{textDecoration:'none'}}>
                    <Button style={{backgroundColor: '#38A3A5', color: '#FFFFFF'}} target="_blank" >
                      View Prescription
                    </Button>
                  </Link>
                </TableCell>:
                <TableCell align="right">
                  <Link to ={`/prescription/${app._id}`} style={{textDecoration:'none'}}>
                    <Button style={{backgroundColor: '#22577A', color: '#FFFFFF',width: '168px'}} >
                      Add Prescription
                    </Button>
                  </Link>
                </TableCell>
                }

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
      </>:
      <>
        <CircularProgress style={{margin: '0 auto'}}/>
      </>
      }
    </>
    
  );
}