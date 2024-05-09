/**
 * @module Accueil.tsx
 * @description Association Accueil Page
 * @utility This page is used to display the association's accueil page
 */
import "./Accueil.scss";
import "../../Volunteer/Home/Home.scss";
import { useEffect, useState } from "react";
import config from "../../../config";
import MissionCard from '../../../components/MissionCard';

interface Mission {
  id: number;
  max_volunteers: number;
  description: string;
  practical_informations: string;
  start_date: string;
  end_date: string;
  location: number;
  title: string;
  status: number;
  theme_id: number;
  picture: string;
}

function Accueil() {
  const [missionList, setMissionList] = useState<Mission[]>([]);

  useEffect(() => {
    fetch(`${config.apiUrl}/missions/association`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setMissionList(data.association_missions);
        });
      }
    });
  }, []);

  return (
    <div>
      <h1> Accueil </h1>
      <div className="body-container">
        <div className="mission-container">
          <div>
            <h2> Prochaines missions : </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {missionList?.map((mission: any) => {
                return (
                  <div style={{ width: "100%", margin: "10px" }}>
                    <MissionCard mission={mission} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accueil;
