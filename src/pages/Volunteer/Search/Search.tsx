import { useState, useEffect } from "react";
import { Button, InputAdornment, Tab, Tabs, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import "./Search.scss";
import FilterModal from "./Modal/FilterModal";
import FilterModalAsso from "./Modal/FilterModalAsso";
import { Mission, Association, Volunteer } from "../../../interfaces"
import { FilterMissionProps, MissionComplete, Modal, ModalAsso, PageAssoProps, PageMission, VolunteerPage, VolunteerProps, filterAssoProps } from "./Interfaces";
import config from "../../../config";
import TabPanel from "../../../components/TabPanel";
import MissionPanel from "./Panels/MissionPanel";
import AssociationPanel from "./Panels/AssociationPanel";
import VolunteerPanel from "./Panels/VolunteerPanel";
import useWindowSize from "../../../functions/useWindowSize";
import filterMissionAndPagination from "./functions/filterMissionAndPagination";
import filterAssoAndPagination from "./functions/filterAssoAndPagination";
import filterVolunteerAndPagination from "./functions/filterVolunteerAndPagination";

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
  const [missionList, setMissionList] = useState<Mission[]>([]);
  const [associationList, setAssociations] = useState<Association[]>([]);
  const [volunteerList, setVolunteerList] = useState<Array<Volunteer>>([]);
  const [location_search, setLocation] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [locations, setLocations] = useState<{ [key: number]: string }>({});
  const width = useWindowSize().width as number;

  // Subtype of the search

  interface Subtype {
    id: number;
    name: string;
  }

  let subtypes: Array<Subtype> = [
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
  const [searchMission, setSearchMission] = useState<boolean>(false);
  const [searchAssociation, setSearchAssociation] = useState<boolean>(false)
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

  if (subType.name === "Missions") {
    modalProps = {
      open: open,
      setOpen: setOpen,
      filteredMissions: filteredMissions,
      setFilteredMissions: setFilteredMissions,
      setSearch: setSearch,
      handleClose: handleClose,
      width: width,
      setSearchMission: setSearchMission
    };
  } else {
    modalProps = {
      open: open,
      setOpen: setOpen,
      filteredAssociations: filteredAssociations,
      setFilteredAssociations: setFilteredAssociations,
      handleClose: handleClose,
      width: width,
      setSearchAssociation: setSearchAssociation
    };
  }

  const FilterModalComponent: React.FC<{ modalProps: CombinedModalPros }> =
    subType.name === "Missions"
      ? (FilterModal as React.FC<{ modalProps: CombinedModalPros }>)
      : (FilterModalAsso as React.FC<{ modalProps: CombinedModalPros }>);

  useEffect(() => {
    fetch(`${config.apiUrl}/missions/`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }).then((data => data.json()))
      .then((data: any) => {
        let association_missions = data.associations_missions
        let mission_list: Mission[] = [];
        association_missions
          .map((mission: Mission) => {
            mission_list.push(mission);
            return null;
          })
        let volunteer_missions = data.close_missions
        volunteer_missions.map((mission: Mission) => {
          mission_list.push(mission)
          return null;
        });
        mission_list.sort(
          (a: Mission, b: Mission) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        );
        setMissionList(mission_list)
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
          let association_list: Association[] = [];
          data
            .map((association: Association) => {
              association_list.push(association)
              return null;
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
              return null;
            })
          setLocations(locs);
        })
      }
    })
  }, [])

  useEffect(() => {
    fetch(`${config.apiUrl}/volunteers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setVolunteerList(data);
      });
  }, []);

  const handleSearch = (e: any) => {
    // setSearch with value of the input from mission lkist if filter is not empty
    setSearch(e.target.value.toLowerCase());
  };

  const handleLocation = (e: any) => {
    setLocation(e.target.value.toLowerCase());
  }


  function returnMissions(): Array<PageMission> {
    let props: FilterMissionProps = {
      missionList: missionList as Array<MissionComplete>,
      filteredMissions: filteredMissions as Array<MissionComplete>,
      search: search,
      location_search: location_search,
      locations: locations,
      searched: searchMission
    }
    let missions: Array<PageMission> = filterMissionAndPagination(props)
    return missions;
  }

  function returnAssociations(): Array<PageAssoProps> {
    let props: filterAssoProps = {
      associationList: associationList,
      filteredAssociations: filteredAssociations,
      search: search,
      searched: searchAssociation
    }
    return filterAssoAndPagination(props)
  }

  function returnVolunteers(): Array<VolunteerPage> {
    let props: VolunteerProps = {
      volunteersList: volunteerList,
      search: search
    }
    return filterVolunteerAndPagination(props)
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
            label="Ville"
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
        {
          subType.name === "Missions" &&
          <div className="filter-container">
            <Button
              className={
                "filter-btn-search"
              }
              sx={{
                background: (localStorage.getItem('color_blind') === 'true') ? '#dedede' : '#ffcf56', ":hover": {
                  background: (localStorage.getItem('color_blind') === 'true') ? '#dedede' : '#ffcf56',
                }
              }}
              variant="contained"
              onClick={() => {
                setOpen(true);
              }}
            >
              Filtres
            </Button>
            <FilterModalComponent modalProps={modalProps} />
          </div>
        }
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
            missions={returnMissions()}
          />
        </TabPanel>
        <TabPanel value={subType.id} index={2}>
          <AssociationPanel
            assoPages={returnAssociations()}
          />
        </TabPanel>
        <TabPanel value={subType.id} index={3}>
          <VolunteerPanel
            volunteerPages={returnVolunteers()}
          />
        </TabPanel>
      </div>
    </div>
  );
}

export default Search;