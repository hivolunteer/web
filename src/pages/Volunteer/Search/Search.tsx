import { useState, useEffect } from "react";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { Button, InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import Box from "@mui/material/Box";
import "./Search.scss";
import CustomSwitch from "../../../components/Switch";
import FilterModal from "./FilterModal";
import FilterModalAsso from "./FilterModalAsso";
import MissionCard from "./MissionCard";
import AssociationCard from "./AssociationCard";
import { Mission, Modal, Association, ModalAsso } from "./Interfaces";
import config from "../../../config";

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
  const [subType, setSubType] = useState<string>("Missions");
  const [locations, setLocations] = useState<{[key: number]: string}>({});
  const [rating, setRating] = useState<number>(0);

  //Modal functions
  const [open, setOpen] = useState<boolean>(false);
  const [filteredMissions, setFilteredMissions] = useState<Mission[] | []>([]);
  const [filteredAssociations, setFilteredAssociations] = useState<
    Association[] | []
  >([]);

  const handleClose = () => {
    setOpen(false);
  };

  type CombinedModalPros = Modal | ModalAsso;
  let modalProps: CombinedModalPros;

  if (subType === "Missions") {
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
    subType === "Missions"
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
            data
            .map((mission: any) => {
              console.log(mission)
              mission_list.push({id: mission.id, title: mission.title, status: mission.status, location: mission.location})
            })
            console.log(mission_list)
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
              .map((association: any) => {
                  association_list.push({id: association.id, name: association.name, rating: association.rating})
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
            label="Recherche par titre de l'association ou de la mission"
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
              "filter-btn " +
              (localStorage.getItem("color_blind") === "true"
                ? " color-blind-bg"
                : "")
            }
            sx={{ background: "#3b3d3c" }}
            variant="contained"
            onClick={() => {
              setOpen(true);
            }}
          >
            Afficher les filtres
          </Button>
          <FilterModalComponent modalProps={modalProps} />
        </div>
        <Box
          className="switch-container"
          sx={{ display: "center", margin: "2%" }}
        >
          <CustomSwitch
            option1="Missions"
            option2="Associations"
            subType={subType}
            setSubType={setSubType}
          />
        </Box>
        {subType === "Missions" ? (
          <div className="missions-container">
            {missionList
              .filter(
                (mission: Mission) =>
                  (filteredMissions.length === 0 ||
                    filteredMissions.some(
                      (filteredMission: Mission) =>
                        mission.id === filteredMission.id
                    )) &&
                  mission.title.toLowerCase().includes(search.toLowerCase())
                  && (locations[mission.location] ? locations[mission.location].toLowerCase().includes(location_search.toLowerCase()) : false)
              )
              .map((mission: Mission) => (
                <div className="mission-card" key={mission.id}>
                  <MissionCard mission_id={mission.id} />
                </div>
              ))}
          </div>
        ) : (
          <div className="missions-container">
            {associationList
              .filter(
                (association: Association) =>
                  (filteredAssociations.length === 0 ||
                    filteredAssociations.some(
                      (filteredAssociation: Association) =>
                        association.id === filteredAssociation.id
                    )) &&
                  association.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((association: Association) => (
                <div className="mission-card" key={association.id}>
                  <AssociationCard association_id={association.id} />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
