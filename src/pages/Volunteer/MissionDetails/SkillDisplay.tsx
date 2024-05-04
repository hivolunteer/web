import { Chip } from "@mui/material";
import { Skill } from "../../../interfaces";
import { useEffect, useState } from "react";
import config from "../../../config";

function SkillDisplay(props: { skills: Skill[] }) {
    const mission_skills = props.skills;

    const [skillsDisplay, setSkillsDisplay] = useState<Skill[]>([]);
    useEffect(() => {
        fetch(`${config.apiUrl}/skills`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then((data: any) => {
                let skills: Skill[] = []
                let data_skills = data as any[]
                mission_skills.forEach((mission_skill) => {
                    data_skills.forEach((data_skill) => {
                        if (mission_skill.skill_id === data_skill.id) {
                            skills.push(data_skill)
                        }
                    })
                })
                console.log(skills)
                setSkillsDisplay(skills)
            })
    }, [])
    return (
        <div className='mission-details-content-skills-box'>
            <p className='mission-details-content-title'> Compétences </p>
            <div className='mission-details-skills'>
                {
                    skillsDisplay.map((skill, index) => {
                        return (
                            <Chip 
                                key={index}
                                label={skill.skill_name}
                                className='mission-details-skill'
                                sx={{
                                    color: 'black',
                                    backgroundColor: skill.color_hex,
                                    '&:hover': {
                                        backgroundColor: skill.color_hex,
                                    },
                                    '&:focus': {
                                        backgroundColor: skill.color_hex,
                                    },
                                    '&:active': {
                                        backgroundColor: skill.color_hex,
                                    },
                                }}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default SkillDisplay;