import React, {useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {Link} from 'react-router-dom'

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      width: '700px',
    },
    contain:{
        marginLeft: '400px',
        marginRight: '400px',
        marginTop: '30px'
    },
  });
  

function PatientHistory(props) {
      

    const classes = useStyles();
    const[appointments, setAppointments] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)
    const patientId = props.match.params.id
    useEffect(()=>{


         function makeRequest() {
            axios.get(`http://localhost:5000/patient/${patientId}`).then ((res)=>{
                const response = res.data;
                setAppointments(response.appointments)
            })
        }
    makeRequest();
    });

    return (
      <>
        <div className={classes.contain}>
            <Typography variant="h4" color="textSecondary" component="p" style={{marginBottom: '15px'}}>
              All Appointments
            </Typography>
            {appointments.length ===0 ?
              <>
                <Card className={classes.root} variant="outlined">
                  <CardContent>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Oops! You have not booked any appointments yet
                      </Typography>
                      <Typography variant="h5" component="p"  style={{marginTop: '10px'}}>
                        Kindly book an appointment to view records
                      </Typography>
                  </CardContent>
                  </Card>
              </>:
              <>
                <TableContainer >
                  <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left">Doctor Name</StyledTableCell>
                        <StyledTableCell align="center">Date</StyledTableCell>
                        <StyledTableCell align="center">Report added</StyledTableCell>
                        <StyledTableCell align="right">Presciption</StyledTableCell>
                      </TableRow>
                    </TableHead>
                  <TableBody>
                  {appointments.map((app) => (
                    <StyledTableRow key={app._id}>
                        <StyledTableCell align="left">{app.doctorName}</StyledTableCell>
                        <StyledTableCell align="center">
                          {new Date(app.date).toLocaleDateString(undefined, {day:'2-digit'}) 
                            + '-' + new Date(app.date).toLocaleDateString(undefined, {month:'short'}) 
                            + '-' + new Date(app.date).toLocaleDateString(undefined, {year:'numeric'})} 
                        </StyledTableCell>
                        {app.url?
                          <>
                            <StyledTableCell align="center">
                              <Button style={{backgroundColor: '#22577A', color: '#FFFFFF'}} href={`${app.url}`} target="_blank">
                                View Reports
                              </Button>
                            </StyledTableCell>
                          </>:
                          <>
                            <StyledTableCell align="center">-</StyledTableCell>
                          </>
                        }
                        {app.prescription?
                        <StyledTableCell align="right" >
                            <Link to ={`/view-prescription/${app._id}`} style={{textDecoration:'none'}}>
                              <Button style={{backgroundColor: '#38A3A5', color: '#FFFFFF'}} target="_blank" >
                                View Prescription
                              </Button>
                            </Link>
                        </StyledTableCell>:
                        <StyledTableCell align="right">No prescription added</StyledTableCell>
                        }
                    </StyledTableRow>
                ))}
                </TableBody>
              </Table>
            </TableContainer>
            </>
            }
          </div>
        </>
    )
}

export default PatientHistory
