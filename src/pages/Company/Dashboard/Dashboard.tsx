import { useState, useEffect } from "react";
import { InputAdornment, Tab, Tabs, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "../../Association/Search/Search.scss";
import { Mission } from "../../../interfaces";
import config from "../../../config";
import TabPanel from "../../../components/TabPanel"
import MissionPanel from "../../Association/Search/Panels/MissionPanel";
import { Team, Volunteer, Company } from "../../../interfaces";
import { Button } from "react-bootstrap";

export default function Dashboard() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [employees, setEmployees] = useState<Volunteer[]>([]);
  const [linkedAssociationsNumber, setLinkedAssociationsNumber] = useState(0);
  const [linkedMissionsNumber, setLinkedMissionsNumber] = useState(0);
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  const [nb, setnb] = useState(1);

  useEffect(() => {
    console.log("FETCH DATA BOZO");
    if (!company) {
      fetch(`${config.apiUrl}/companies/dashboard`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.ok) {
          response.json().then((body) => {
            setTeams(body.teams);
            setEmployees(body.employees);
            setCompany(body.company);
            setLinkedAssociationsNumber(body.linked_associations_nb);
            setLinkedMissionsNumber(body.linked_missions_nb);

            printData();
          });
        }
      });
    }
  }, [company]);

  function printData(index?: Number) {
    if (index) {
      console.log("INDEX: " + index);
    } else {
      console.log("NULL");
    }
    console.log(`teams : ${JSON.stringify(teams)}`);
    console.log(`employees : ${JSON.stringify(employees)}`);
    console.log(`company : ${JSON.stringify(company)}`);
    console.log(`linked asso : ${linkedAssociationsNumber}`);
    console.log(`linked missi : ${linkedMissionsNumber}`);
  }

  function Placeholder() {
    return (
      <div>
        <h1>placeholder</h1>
      </div>
    );
  }

  function Data() {
    return (
      <div>
        <h1>{company!.name}</h1>
      </div>
    );
  }

  return (
    <div className="page-container">
      {(company == null) ? <Placeholder/> : <Data/>}
      <Button onClick={() => { printData(nb); setnb(nb + 1); }}>DISP DATA</Button>
    </div>
  );
}