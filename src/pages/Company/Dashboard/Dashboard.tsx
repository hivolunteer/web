import { useState, useEffect } from "react";
import { InputAdornment, Tab, Tabs, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "../../Association/Search/Search.scss";
import { Mission } from "../../../interfaces";
import config from "../../../config";
import TabPanel from "../../../components/TabPanel"
import MissionPanel from "../../Association/Search/Panels/MissionPanel";
import { Team } from "../../../interfaces";

export default function Dashboard() {
/*
{
  "message": "Company Dashboard Retrieved Successfully",
  "teams": [
    {
      "id": 1,
      "company_id": 1,
      "name": "vv",
      "description": null,
      "affiliation_token": null,
      "bee": 0
    }
  ],
  "employees": [
    {
      "id": 51,
      "first_name": "Rudeus",
      "last_name": "Greyrat",
      "bee": 0,
      "phone": "azbbz",
      "rating": "0",
      "profile_picture": "",
      "team_id": 1
    }
  ],
  "company": {
    "name": "evil company",
    "email": "bozo@gmail.com",
    "description": null,
    "phone": null,
    "profile_picture": null,
    "is_premium": false,
    "is_verified": false
  },
  "linked_associations_nb": 0,
  "linked_missions_nb": 0
}
*/
  return (
    <div className="page-container">
      <h1>orepizjo</h1>
    </div>
  );
}