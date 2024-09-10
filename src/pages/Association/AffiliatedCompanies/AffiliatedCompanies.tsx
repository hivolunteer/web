import { useState, useEffect } from 'react';
import config from '../../../config';
import { Company } from '../../../interfaces';
import profileImage from "../../../images/logo/submark.png";
import { MdOutlineDelete } from "react-icons/md";
import './AffiliatedCompanies.scss';

function AffiliatedCompanies(props: any) {
    const [companyList, setCompanyList] = useState<Company[]>([]);

    useEffect(() => {
        fetch(`${config.apiUrl}/affiliated_companies/list`, {
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

    return (
        <div className="affiliated-companies">
            <h1 className="affiliated-companies-title">Entreprises affiliées</h1>
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