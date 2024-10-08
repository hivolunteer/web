import { useState, useEffect } from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "../../Association/Search/Search.scss";
import { Mission } from "../../../interfaces";
import config from "../../../config";
import MissionPanel from "../../Association/Search/Panels/MissionPanel";

function Missions() {
    const [publishedMissions, setPublishedMissions] = useState<Mission[]>([]);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        fetch(`${config.apiUrl}/missions/`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then((data) => data.json())
            .then((data: any) => {
                console.log(data);
                const active: Mission[] = Array.isArray(data.associations_missions) ? data.associations_missions : [];

                setPublishedMissions(active);
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
                </div>
                    {publishedMissions.length > 0 ? (
                        <MissionPanel missionList={publishedMissions} search={search} />
                    ) : (
                        <div className="no-missions-message">Aucune mission publiée</div>
                    )}

            </div>
        </div>
    );
}

export default Missions;