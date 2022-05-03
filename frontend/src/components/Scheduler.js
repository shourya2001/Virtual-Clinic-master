import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  MonthView,
  DayView,
  DateNavigator,
  Appointments,
  TodayButton,
  ViewSwitcher,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import axios from 'axios';
import classNames from 'clsx';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


const style = ({ palette }) => ({
  icon: {
    color: palette.action.active,
  },
  textCenter: {
    textAlign: 'center',
  },
  header: {
    height: '0px',
  },
  joinbutton:{
    width: '200px',
    marginLeft: '60px'
  },
  contain:{
    marginTop: '50px',
    width: '100%'
  },
  commandButton: {
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
});

const getClassByLocation = (classes, location) => {
  if (location === 'Room 1') return classes.firstRoom;
  if (location === 'Room 2') return classes.secondRoom;
  return classes.thirdRoom;
};


const Header = withStyles(style, { name: 'Header' })(({
  children, appointmentData, classes, ...restProps
}) => (
  <AppointmentTooltip.Header
    {...restProps}
    className={classNames(getClassByLocation(classes, appointmentData.location), classes.header)}
    appointmentData={appointmentData}
  >
  </AppointmentTooltip.Header>
));

const Content = withStyles(style, { name: 'Content' })(({
  children, appointmentData, classes, ...restProps
}) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Grid container alignItems="center">
      <Grid item xs={2} className={classes.textCenter}>
        <Link to= {`/meeting/${appointmentData.location}`} style={{textDecoration: 'none'}}>
        <Button className={classes.joinbutton} variant="contained" color="primary" >Join the meeting</Button>
        </Link>
      </Grid>
      <Grid item xs={10}>
      </Grid>
    </Grid>
  </AppointmentTooltip.Content>
));



const CommandButton = withStyles(style, { name: 'CommandButton' })(({
  classes, ...restProps
}) => (
  <AppointmentTooltip.CommandButton {...restProps} className={classes.commandButton} />
));

export class DoctorHome extends React.PureComponent {

  constructor(props) {
    super(props)

    this.state = {
        data: [],
        apps: [],
        currentDate: new Date(),
    };
    this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/doctor-home/${this.props.id}`)
      .then(res => {
        const appointments = res.data.appointments;
        this.setState({apps: appointments});
        console.log(appointments)
      })
  }

    render(){

      const {currentDate} = this.state;
      const istTime = date => new Date(date).toLocaleString('en-US', {timeZone: 'UTC'});
        
      const data = this.state.apps.map(function(row){
        return {

          title: row.patientName,
          startDate: istTime(row.startDate),
          endDate: istTime(row.endDate),
          location: row._id,
          reportLink: row.url

        }
      })
        
        return (
          <Paper style={{marginTop: '50px', width: '1200px'}}>
            <Scheduler
              data={data}
              height={660}
            >
              <ViewState
                currentDate={currentDate}
                onCurrentDateChange={this.currentDateChange}
              />
              <WeekView
                startDayHour={9}
                endDayHour={19}
              />
              <MonthView />
              <DayView/>
              <Toolbar />
              <ViewSwitcher />
              <DateNavigator />
              <TodayButton />
              <Appointments />
              <AppointmentTooltip
                headerComponent={Header}
                contentComponent={Content}
                commandButtonComponent={CommandButton}
                showCloseButton
              />
            </Scheduler>
            
        
          </Paper>
        );
      }
    }

export default DoctorHome
