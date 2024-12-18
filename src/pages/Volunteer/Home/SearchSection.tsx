import { useEffect, useState } from "react";
import "./SearchSection.scss";
import config from "../../../config";
import { Box, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchSection() {
    const [profile, setProfile] = useState<any>({})

    useEffect(() => {
        fetch(`${config.apiUrl}/volunteers/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setProfile(data.volunteer)
                })
            }
        })
    }, [])

    function handleSearch() {
        const search = document.getElementById("search-text") as HTMLInputElement;
        console.log("SEARCH VALUE", search.value);
        window.location.href = `/accueil?query=${search.value}`;
    }

    return (
        <Box className="component-search-section-container">
            <div className="component-search-section-hello">
                <p className="component-search-section-title">
                    Bonjour {profile.first_name} 👋
                </p>
                <p className="component-search-section-subtitle">
                    quelle sera votre prochaine mission ?
                </p>
            </div>
            <div className="component-search-section-search">
                <InputBase className="component-search-section-search-bar" placeholder="Rechercher une mission" id="search-text" onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        console.log("EVENT", event.key)
                        handleSearch();
                    }
                }} />
                <IconButton className="component-search-section-search-button" onClick={handleSearch}>
                    <SearchIcon className="component-search-section-search-icon" />
                </IconButton>
            </div>
        </Box>
    );
}

export default SearchSection;