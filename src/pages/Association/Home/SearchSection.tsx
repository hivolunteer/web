import React, { useEffect, useState } from "react";
import "./SearchSection.scss";
import config from "../../../config";
import { Box, Grid, IconButton, InputBase, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { maxWidth, width } from "@mui/system";

function SearchSection() {
    const [profile, setProfile] = useState<any>({})

    useEffect(() => {
        fetch(`${config.apiUrl}/associations/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setProfile(data.association)
                })
            }
        })
    }, [])

    function handleSearch() {
        const search = document.getElementById("search-text") as HTMLInputElement;
        console.log(search.value);
        window.location.href = `/accueil?query=${search.value}`;
    }

    return (
        <Box className="component-search-section-container">
            <div className="component-search-section-hello">
                <p className="component-search-section-title">
                    Bonjour {profile.name} 👋
                </p>
                <p className="component-search-section-subtitle">
                    découvrez vos missions
                </p>
            </div>
            <div className="component-search-section-search">
                <InputBase className="component-search-section-search-bar" placeholder="Rechercher une mission" id="search-text" onKeyDown={(event) => {
                    if (event.key === 'Enter') {
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