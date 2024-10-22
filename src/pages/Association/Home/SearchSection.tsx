import { useEffect, useState } from "react";
import "./SearchSection.scss";
import config from "../../../config";
import { Box, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import bee from '../../../images/logo/submark_white.png'

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
        const searchValue = search.value.trim();
        if (searchValue) {
            window.location.href = `/accueil?query=${encodeURIComponent(searchValue)}`;
        }
    }    

    return (
        <Box className="component-search-section-container">
            <div className="component-search-section-hello">
                <p className="component-search-section-title">
                    Bonjour {profile.name} 👋 découvrez vos missions
                </p>
                <p className="component-search-section-subtitle">
                    Vous avez un score de {profile.bee} <img src={ bee } alt='Bee' className='bee'/>                    
                </p>
            </div>
            <div className="component-search-section-search">
                <InputBase className="component-search-section-search-bar" placeholder="Rechercher une mission" id="search-text" onKeyDown={(event) => {
                    console.log("EVENT KEY", event.key)
                    if (event.key === 'Enter') {
                        console.log("EVENT", event)
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