import { useEffect, useState } from "react";
import { Association, Referent } from "./interfaceReferent";
import config from "../../../config";
import { Button } from "@mui/material";
import { MdOutlineCopyAll } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import profileImage from "../../../images/logo/submark.png";
import './Referent.scss'

function ReferentPage() {

  const [association, setAssociation] = useState<Association | null>(null)
  const [referentList, setReferentList] = useState<Referent[]>([])
  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Referent"

    fetch(`${config.apiUrl}/associations/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            setAssociation(data.association as Association)
          })
        }
      })
      .catch(err => {
        console.log(err)
      })

    fetch(`${config.apiUrl}/referent/list`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res: any) => {
        console.log(res)
        if (res.status === 200) {
          res.json().then((data: Referent[]) => {
            setReferentList(data as Referent[])
          })
        }
      })
  }, [])

  function generateToken() {
    fetch(`${config.apiUrl}/referent/genCode`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res: any) => {
        if (res.status === 201) {
          res.json().then((data: Association) => {
            setAssociation(data as Association)
          })
        } else {
          alert("Erreur dans la base de données. Veuillez contactez un administrateur si le probléme persiste.")
          window.location.href = "/";
          window.location.reload();
        }
      })
  }

  function deleteToken() {
    fetch(`${config.apiUrl}/referent/genCode`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res: any) => {
        if (res.status === 201) {
          res.json().then((data: Association) => {
            setAssociation(data as Association)
          })
        } else {
          alert("Erreur dans la base de données. Veuillez contactez un administrateur si le probléme persiste.")
          window.location.href = "/";
          window.location.reload();
        }
      })
  }

  function unLinkReferent(id: number) {
    fetch(`${config.apiUrl}/referent/asso/` + String(id), {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res: any) => {
        if (res.status === 201) {
          res.json().then(() => {
            let referent_list = referentList.filter((referent: Referent) => referent.id !== id)
            setReferentList(referent_list)
          })
        } else {
          alert("Erreur dans la base de données. Veuillez contactez un administrateur si le probléme persiste.")
          window.location.href = "/";
          window.location.reload();
        }
      })
  }

  function handleCopyCode(code: string) {
    navigator.clipboard.writeText(code);
    setCopyMessage('Copié au presse-papier');
    
    setTimeout(() => setCopyMessage(null), 2000);
  }

  return (
    <div className="container">
      <div className="referent-header">
        <h1 className="referent-title"> Gestion des Référents </h1>
      </div>
      <div className="referent-code">
        {association?.referent_token === null ? (
          <Button
            variant="contained"
            onClick={generateToken}
            className="generate-token-button"
          >
            Générer un code référent
          </Button>
        ) : (
          <div className="token-container">
            <div className="token-label-container">
              <p className="token-label">
                <span className="bold">Code référent: </span>
                {association?.referent_token}
              </p>
              <div className="icon-container">
                <MdOutlineCopyAll
                  className="icon"
                  title="Copier le code"
                  onClick={() => handleCopyCode(association?.referent_token as string)}
                />
                <MdOutlineDelete
                  className="icon"
                  title="Supprimer le code"
                  onClick={deleteToken}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {copyMessage &&
        <div className="msg-container" >
            <p className="copy-message">{copyMessage}</p>
        </div>
      }
      <div className="referent-list">
        <h1 className="referent-list-title"> Liste des référents </h1>
        <div className="referent-list-header" style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div className="referent-list-header">
            {
              (referentList.length === 0) ?
                <p> Aucun référent pour le moment </p>
                :
                referentList.map((referent: Referent) => {
                  return (
                    <div className="referent-row" key={referent.id} style={{ width: "50%" }}>
                      <div className="referent-picture">
                        <img
                          src={(referent.profile_picture !== null) ? referent.profile_picture : profileImage}
                          alt="profile_picture"
                          className="picture"
                        />
                      </div>
                      <p className="referent-name" style={{ fontWeight: "bold" }}>
                        {referent.first_name} {referent.last_name}
                      </p>
                      <p className="referent-email" style={{ fontStyle: "italic", textDecoration: "underline" }}>
                        {referent.email}
                      </p>
                      <div className="referent-action">
                        <MdOutlineDelete
                          className="icon-card"
                          title="Supprimer le référent"
                          onClick={() => {
                            if (window.confirm('Êtes-vous sûr de vouloir supprimer ce référent ? Cette action est irréversible.')) {
                              unLinkReferent(referent.id);
                            }
                          }}
                          size={20}
                        />
                      </div>
                    </div>
                  )
                })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReferentPage;