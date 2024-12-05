import { useState, useEffect } from 'react';
import config from '../../../config';
import {  Company } from '../../../interfaces';
import profileImage from "../../../images/logo/submark.png";
import { Button } from '@mui/material';
import { MdOutlineCopyAll } from "react-icons/md";
import { MdOutlineDelete, MdOutlineRestartAlt } from "react-icons/md";
import './AffiliatedCompanies.scss';

interface Association {
    id: number,
    name: string,
    rating: number,
    company_token: string | null
}

function AffiliatedCompanies(props: any) {
    const [companyList, setCompanyList] = useState<Company[]>([]);
    const [association, setAssociation] = useState<Association | null>(null)
    const [copyMessage, setCopyMessage] = useState<string | null>(null);

    useEffect(() => {
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


        fetch(`${config.apiUrl}/affiliated_companies/list/company`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(json => {
            const companies = json.companies.map((company: Company) => ({
                id: company.id,
                name: company.name,
                profile_picture: company.profile_picture
            }));
            setCompanyList(companies);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
        });
    }, []);

    function generateToken() {
        fetch(`${config.apiUrl}/affiliated_companies/genCode`, {
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


    function unLinkCompany(id: number) {
        fetch(`${config.apiUrl}/affiliated_companies/company/` + String(id), {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res: any) => {
                if (res.status === 200) {
                    res.json().then(() => {
                        let company_list = companyList.filter((company: Company) => company.id !== id)
                        setCompanyList(company_list)
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
        <div className="affiliated-companies">
            <h1 className="affiliated-companies-title">Entreprises affiliées</h1>
            <div className="referent-code">
                {association?.company_token === null ? (
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
                        <span className="bold">Code entreprise: </span>
                        {association?.company_token}
                        </p>
                        <div>
                            <MdOutlineCopyAll
                                className="icon"
                                title="Copier le code"
                                onClick={() => handleCopyCode(association?.company_token as string)}
                            />
                            <MdOutlineRestartAlt
                                className="icon"
                                title="Changer le code"
                                onClick={generateToken}
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
            <div className="affiliated-companies-list-header">
                {
                    (companyList.length === 0) ?
                        <p> Aucune entreprise afffiliée pour le moment </p>
                    :
                        companyList.map((company: Company) => (
                            <div className="company-row" key={company.id}>
                              <div className="company-picture">
                                <img
                                  src={company.profile_picture !== null ? company.profile_picture : profileImage}
                                  alt="profile_picture"
                                  className="picture"
                                />
                              </div>
                              <p className="company-name">{company.name}</p>
                              <div className="company-action">
                                <MdOutlineDelete
                                  className="icon-card"
                                  title="Supprimer le référent"
                                  onClick={() => {
                                    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette entreprise affiliée ? Cette action est irréversible.')) {
                                      unLinkCompany(company.id);
                                    }
                                  }}
                                  size={20}
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default AffiliatedCompanies;