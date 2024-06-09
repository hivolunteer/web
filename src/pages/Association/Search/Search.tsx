import { useState, useEffect } from "react";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { InputAdornment, Tab, Tabs, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./Search.scss";
import { Mission } from "../../../interfaces";
import config from "../../../config";
import TabPanel from "./Panels/TabPanel";
import MissionPanel from "./Panels/MissionPanel";
import useWindowSize from "../../../functions/useWindowSize";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Search(props: any) {
  const [draftMissions, setDraftMissions] = useState<Mission[]>([]);
  const [publishedMissions, setPublishedMissions] = useState<Mission[]>([]);
  const [pastMissions, setPastMissions] = useState<Mission[]>([]);
  const [search, setSearch] = useState<string>("");

  interface Subtype {
    id: number;
    name: string;
  }

  const subtypes: Array<Subtype> = [
    { id: 1, name: "Missions publiées" },
    { id: 2, name: "Missions brouillon" },
    { id: 3, name: "Missions passées" },
  ];

  const [subType, setSubType] = useState<Subtype>(subtypes[0]);

  useEffect(() => {
    fetch(`${config.apiUrl}/missions/association/`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((data: any) => {
        const draft: Mission[] = Array.isArray(data.draft) ? data.draft : [];
        const active: Mission[] = Array.isArray(data.active) ? data.active : [];
        const passed: Mission[] = Array.isArray(data.passed) ? data.passed : [];

        setDraftMissions(draft);
        setPublishedMissions(active);
        setPastMissions(passed);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <div className="page-container">
      <div className="search-filter">
        <div className="search-bar-container">
          <TextField
            id="search-bar"
            style={{ flex: 4 }}
            label="Rechercher une mission"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            sx={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "10px",
            }}
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="centered-container">
        <div className="tabs-container">
          <Tabs
            value={subType.id}
            onChange={(e, value) => {
              setSubType(subtypes.find((subtype) => subtype.id === value) || subtypes[0]);
            }}
            variant="fullWidth"
            sx={{ borderBottom: 0 }}
          >
            {subtypes.map(subtype => (
              <Tab
                key={subtype.id}
                label={subtype.name}
                value={subtype.id}
                sx={{
                  background: "#FFFFFF",
                }}
              />
            ))}
          </Tabs>
        </div>
        <TabPanel value={subType.id} index={1}>
          <MissionPanel
            missionList={publishedMissions}
            search={search}
          />
        </TabPanel>
        <TabPanel value={subType.id} index={2}>
          <MissionPanel
            missionList={draftMissions}
            search={search}
          />
        </TabPanel>
        <TabPanel value={subType.id} index={3}>
          <MissionPanel
            missionList={pastMissions}
            search={search}
          />
        </TabPanel>
      </div>
    </div>
  );
}

export default Search;
