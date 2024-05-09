import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "moment/locale/fr";
import "./App.scss";
import UserTypeChoice from "./pages/UserTypeChoice/UserTypeChoice";

// import Pages
// import Home from './pages/Home/Home';
import AssociationRouter from "./routers/NoConnectAssociationRouter";
import AssociationRouterConnected from "./routers/ConnectAssociationRouter";
import VolunteerRouter from "./routers/NoConnectVolunteerRouter";
import VolunteerRouterConnected from "./routers/ConnectVolunteerRouter";
import ResponsiveAppBar from "./sidebar/Sidebar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ThemeProvider, useTheme } from "@mui/material";
import { myTheme } from "./theme/theme";
import { useEffect } from "react";
import Home from "./pages/NonConnected/Home/Home";

function NoConnectRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/auth" element={<UserTypeChoice />} />
          <Route path="/volunteers/*" element={<VolunteerRouter />} />
          <Route path="/associations/*" element={<AssociationRouter />} />
          <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

function ConnectRouter() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        {localStorage.getItem("role") === "volunteer" ? (
          <Route path="/*" element={<VolunteerRouterConnected />} />
        ) : (
          <Route path="/*" element={<AssociationRouterConnected />} />
        )}
      </Routes>
    </Router>
  );
}

function App() {

  const theme = useTheme();

  useEffect (() => {
    localStorage.getItem("token") ? document.body.style.backgroundColor = "#f5f5f5" : document.body.style.backgroundColor = "#DFDFDF"
  }, []);
  
  return (
    <ThemeProvider theme={myTheme}>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="fr">
        {
          localStorage.getItem("token") ? (
            <div>
              <ConnectRouter />
            </div>
          ) : (
            <NoConnectRouter />
          )
        }
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
