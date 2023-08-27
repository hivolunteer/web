import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserTypeChoice from "./pages/userTypeChoice/userTypeChoice";
import 'moment/locale/fr';

// import Pages
// import Home from './pages/Home/Home';
import AssociationRouter from './routers/NoConnectAssociationRouter';
import AssociationRouterConnected from './routers/ConnectAssociationRouter';
import VolunteerRouter from './routers/NoConnectVolunteerRouter';
import VolunteerRouterConnected from './routers/ConnectVolunteerRouter';
import ResponsiveAppBar from './sidebar/Sidebar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

function NoConnectRouter() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<UserTypeChoice />} />
        <Route path="/volunteers/*" element={<VolunteerRouter />} />
        <Route path="/associations/*" element={<AssociationRouter />} />
      </Routes>
    </Router>
  )
}

function ConnectRouter() {

  return(
    <Router>
      <ResponsiveAppBar />
      <Routes>
        {
          localStorage.getItem('role') === 'volunteer' ?
            <Route path="/*" element={<VolunteerRouterConnected />} />
            :
            <Route path="/*" element={<AssociationRouterConnected />} />
        }
      </Routes>
    </Router>
  )
}

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="fr">
      <div>
        {
          localStorage.getItem('token') ? (
            <ConnectRouter />
          ) : (
            <NoConnectRouter />
          )
        }
      </div>
    </LocalizationProvider>
  );
}

export default App;
