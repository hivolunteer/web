import { useState, useEffect } from "react";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { Button, InputAdornment, Tab, Tabs, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import "./Search.scss";
import FilterModal from "./Modal/FilterModal";
import FilterModalAsso from "./Modal/FilterModalAsso";
import { Mission, Association } from "../../../interfaces"
import { Modal, ModalAsso } from "./Interfaces";
import config from "../../../config";
import TabPanel from "./Panels/TabPanel";
import MissionPanel from "./Panels/MissionPanel";
import AssociationPanel from "./Panels/AssociationPanel";
import VolunteerPanel from "./Panels/VolunteerPanel";

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
  const [missionList, setMissionList] = useState<Mission[]>([]);
  const [associationList, setAssociations] = useState<Association[]>([]);
  const [location_search, setLocation] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [locations, setLocations] = useState<{[key: number]: string}>({});
  const [rating, setRating] = useState<number>(0);

  // Subtype of the search

  interface Subtype {
    id: number;
    name: string;
  }

  let subtypes : Array<Subtype> = [
    {
      id: 1,
      name: "Missions"
    },
    {
      id: 2,
      name: "Associations"
    },
    {
      id: 3,
      name: "Bénévoles"
    }
  ]
  const [subType, setSubType] = useState<Subtype>(subtypes[0])


  //Modal functions
  const [open, setOpen] = useState<boolean>(false);
  const [filteredMissions, setFilteredMissions] = useState<Mission[] | []>([]);
  const [filteredAssociations, setFilteredAssociations] = useState<
    Association[] | []
  >([]);

  /***** QUERY PARAMS FROM HOME PAGE *****/
  window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");
    if (query) {
      console.log(`Query: ${query}`);
      setSearch(query);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  type CombinedModalPros = Modal | ModalAsso;
  let modalProps: CombinedModalPros;

  if (subType.name === "Missions") {
    modalProps = {
      open: open,
      setOpen: setOpen,
      filteredMissions: filteredMissions,
      setFilteredMissions: setFilteredMissions,
      handleClose: handleClose,
    };
  } else {
    modalProps = {
      open: open,
      setOpen: setOpen,
      filteredAssociations: filteredAssociations,
      setFilteredAssociations: setFilteredAssociations,
      handleClose: handleClose,
    };
  }

  const FilterModalComponent: React.FC<{ modalProps: CombinedModalPros }> =
    subType.name === "Missions"
      ? (FilterModal as React.FC<{ modalProps: CombinedModalPros }>)
      : (FilterModalAsso as React.FC<{ modalProps: CombinedModalPros }>);

  useEffect(() => {
    fetch(`${config.apiUrl}/missions/association`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            let mission_list : Mission[] = [];
            data.map((mission: Mission) => {
              mission_list.push(mission)
            })
            setMissionList(mission_list)
          })
        }
     })
  }, [])

  useEffect(() => {
    fetch(`${config.apiUrl}/associations/`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
              let association_list : Association[] = [];
              data
              .map((association: Association) => {
                  association_list.push(association)
              })
              setAssociations(association_list)
          })
        }
      })
     }, [])

    // Get all location names and ids
    useEffect(() => {
      fetch(`${config.apiUrl}/locations/`, {
          method: 'GET',
          headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
          }
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            // stock locations and location ids
            let locs: { [key: number]: string } = {};
            data
            .map((location: any) => {
              locs[location.id] = location.city;
            })
            setLocations(locs);
            console.log(locs);
          })
        }
      })
    }, [])
  const handleSearch = (e: any) => {
    // setSearch with value of the input from mission lkist if filter is not empty
    setSearch(e.target.value.toLowerCase());
  };

  const handleLocation = (e: any) => {
    setLocation(e.target.value.toLowerCase());
  }
  //className={"header-rating" + ((localStorage.getItem("color_blind") === "true") ? " color-blind-bg" : "")}
  return (
    <div className="page-container">
      <div className="search-filter">
        <div className="search-bar-container">
          <TextField
            id="search-bar"
            style={{ flex: 4 }}
            label={
              subType.name === "Missions"
                ? "Rechercher une mission"
                : subType.name === "Associations"
                ? "Rechercher une association"
                : "Rechercher un bénévole"
            }
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
          <div style={{ width: "2%" }} />
          <TextField
            id="outlined-basic"
            label="Ville, Pays"
            variant="outlined"
            className="search-country"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <PlaceOutlinedIcon />
                </InputAdornment>
              ),
            }}
            value={location_search}
            onChange={handleLocation}
            sx={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>
      <div className="centered-container">
        <div className="filter-container">
          <Button
            className={
              "filter-btn-search"
            }
            sx={{ background: (localStorage.getItem('color_blind') === 'true') ? '#dedede' : '#ffcf56', ":hover": {background: (localStorage.getItem('color_blind') === 'true') ? '#dedede' : '#ffcf56'}}}
            variant="contained"
            onClick={() => {
              setOpen(true);
            }}
          >
            Afficher les filtres
          </Button>
          <FilterModalComponent modalProps={modalProps} />
        </div>
        <div className="tabs-container">
          <Tabs
            value={subType.name}
            onChange={(e, value) => {
              setSubType(subtypes.filter((subtype) => subtype.name === value)[0]);
            }}
            variant="fullWidth"
            sx={{ borderBottom: 0 }}
          >
            <Tab
              label="Missions"
              value="Missions"
              sx={{
                background: "#FFFFFF",
              }}
            />
            <Tab
              label="Associations"
              value="Associations"
              sx={{
                background: "#FFFFFF",
              }}
            />
            <Tab
              label="Bénévoles"
              value="Bénévoles"
              sx={{
                background: "#FFFFFF",
              }}
            />
          </Tabs>
        </div>
        <TabPanel value={subType.id} index={1}>
          <MissionPanel
            missionList={missionList}
            filteredMissions={filteredMissions}
            search={search}
            location_search={location_search}
            locations={locations}
          />
        </TabPanel>
        <TabPanel value={subType.id} index={2}>
          <AssociationPanel
            associationList={associationList}
            filteredAssociations={filteredAssociations}
            search={search}
          />
        </TabPanel>
        <TabPanel value={subType.id} index={3}>
          <VolunteerPanel
            volunteerFilteredList={[]}
            search={search}
          />
        </TabPanel>
      </div>
    </div>
  );
}

export default Search;
