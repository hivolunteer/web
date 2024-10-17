import { useState, useEffect } from "react";
import { InputAdornment, Tab, Tabs, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "../../Association/Search/Search.scss";
import { Mission } from "../../../interfaces";
import config from "../../../config";
import TabPanel from "../../../components/TabPanel"
import MissionPanel from "../../Association/Search/Panels/MissionPanel";

function MyMission(props: any) {
  const [publishedMissions, setPublishedMissions] = useState<Mission[]>([]);
  const [pastMissions, setPastMissions] = useState<Mission[]>([]);
  const [search, setSearch] = useState<string>("");

  interface Subtype {
    id: number;
    name: string;
  }

  const subtypes: Array<Subtype> = [
    { id: 1, name: "Missions publiées" },
    { id: 2, name: "Missions passées" },
  ];

  const [subType, setSubType] = useState<Subtype>(subtypes[0]);

  useEffect(() => {
    fetch(`${config.apiUrl}/missions/close/my`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((data: any) => {
        const active: Mission[] = Array.isArray(data.incoming) ? data.incoming : [];
        const passed: Mission[] = Array.isArray(data.passed) ? data.passed : [];

        active.sort(
          (a: { start_date: Date }, b: { start_date: Date }) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        );
        passed.sort(
          (a: { start_date: Date }, b: { start_date: Date }) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
        );
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
          {publishedMissions.length > 0 ? (
            <MissionPanel missionList={publishedMissions} search={search} />
          ) : (
            <div className="no-missions-message">Aucune mission publiée</div>
          )}
        </TabPanel>
        <TabPanel value={subType.id} index={2}>
          {pastMissions.length > 0 ? (
            <MissionPanel missionList={pastMissions} search={search} />
          ) : (
            <div className="no-missions-message">Aucune mission passée</div>
          )}
        </TabPanel>
      </div>
    </div>
  );
}

export default MyMission;
