import { useState, useEffect } from "react";
import { InputAdornment, Tab, Tabs, TextField } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./Search.scss";
import { Mission } from "../../../interfaces";
import config from "../../../config";
import TabPanel from "../../../components/TabPanel"
import MissionPanel from "./Panels/MissionPanel";

// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

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
  const [searchParams] = useSearchParams();

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
        draft.sort(
          (a: { start_date: Date }, b: { start_date: Date }) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        );
        active.sort(
          (a: { start_date: Date }, b: { start_date: Date }) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        );
        passed.sort(
          (a: { start_date: Date }, b: { start_date: Date }) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
        );

        setDraftMissions(draft);
        setPublishedMissions(active);
        setPastMissions(passed);
      });
      const subTypeId = searchParams.get("subType");
      if (subTypeId) {
        const selectedSubType = subtypes.find((subtype) => subtype.id === parseInt(subTypeId));
        if (selectedSubType) setSubType(selectedSubType);
      }
       // Set the initial search state from URL query
      const params = new URLSearchParams(window.location.search);
      const query = params.get("query");
      if (query) {
        setSearch(query);
      }
  }, []);

  function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function handleSearch() {
    if (search.trim()) {
      window.location.href = `/accueil?query=${encodeURIComponent(search)}`;
    }
  }

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
                  <SearchOutlinedIcon
                    onClick={handleSearch}
                    style={{ cursor: "pointer" }}
                  />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            sx={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "10px",
            }}
            value={search}
            onChange={handleSearchInputChange}
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
        <TabPanel value={subType.id} index={2}>
          {draftMissions.length > 0 ? (
            <MissionPanel missionList={draftMissions} search={search} />
          ) : (
            <div className="no-missions-message">Aucune mission brouillon</div>
        )}
        </TabPanel>
        <TabPanel value={subType.id} index={1}>
          {publishedMissions.length > 0 ? (
            <MissionPanel missionList={publishedMissions} search={search} />
          ) : (
            <div className="no-missions-message">Aucune mission publiée</div>
        )}
        </TabPanel>
        <TabPanel value={subType.id} index={3}>
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

export default Search;
