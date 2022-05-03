import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './pages/Login'
import PatientRegister from './pages/PatientRegister';
import DoctorRegister from './pages/DoctorRegister';
import DoctorHome from './pages/DoctorHome';
import PatientHome from './pages/PatientHome';
import BookAppointment from './pages/BookAppointment';
import EditAppointment from './pages/editAppointment';
import Meeting from './pages/Meeting'
import Home from './pages/Home';
import PatientHistory from './components/PatientHistory';
import Prescription from './pages/Prescription';
import DoctorProfile from './components/DoctorProfile';
import PrescriptionCard from './components/PrescriptionCard';
import Scheduler from './components/Scheduler'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path = "/" render={(routeProps)=>< Home {...routeProps}/>} />
          <Route exact path = "/login" render={(routeProps)=><Login {...routeProps}/>} />
          <Route exact path = "/register-patient"  render = {(routeProps) => <PatientRegister  {...routeProps}/>}/>
          <Route exact path = "/view-prescription/:id"  render = {(routeProps) => <PrescriptionCard  {...routeProps}/>}/>
          <Route exact path = "/register-doctor"  render = {(routeProps) => <DoctorRegister  {...routeProps}/>}/>
          <Route exact path = "/doctor-home/:id" render = {(routeProps) => <DoctorHome  {...routeProps}/>} />
          <Route exact path = "/doctor-profile/:id" render = {(routeProps) => <DoctorProfile  {...routeProps}/>} />
          <Route exact path = "/patient-home/:id" render = {(routeProps) => <PatientHome {...routeProps}/>}/>
          <Route exact path = "/history/:id" render = {(routeProps) => <PatientHistory {...routeProps}/>}/>
          <Route exact path = "/book-appointment/:id" render={(routeProps) => <BookAppointment {...routeProps}/>} />
          <Route exact path = "/edit-appointment/:id" render={(routeProps) => <EditAppointment {...routeProps}/>} />
          <Route exact path = "/meeting/:id" render ={(routeProps) => <Meeting {...routeProps} />}/>
          <Route exact path = "/prescription/:id" render ={(routeProps) => <Prescription {...routeProps} />}/>
          {/* <Route exact path = "/schedule/:id" render ={(routeProps) => <Scheduler {...routeProps} />}/> */}
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
