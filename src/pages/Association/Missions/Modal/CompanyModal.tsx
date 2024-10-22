import { useState, useEffect } from "react";
import config from "../../../../config";
import { Box, Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CompanyCard from "../Card/CompanyCard";

const CompanyModal = (props: {
    selectCompany: React.Dispatch<React.SetStateAction<{ id: number; name: string; profile_picture: string} | null>>;
    companyModal: boolean;
    closeCompanyModal: () => void;
}) => {

    const [affiliatedCompanies, setAffiliatedCompanies] = useState<{ id: number, profile_picture: string, name: string }[]>([]);

    const [search, setSearch] = useState<string>("");

    const handleSelectCompany = (company: { id: number, name: string, profile_picture: string }) => {
        props.selectCompany(company);
        props.closeCompanyModal();
    }

    useEffect(() => {
      const getAffiliatedCompanies = async () => {
        try {
          const response = await fetch(`${config.apiUrl}/affiliated_companies/list/company`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          
          if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            setAffiliatedCompanies(data.companies);
          }
        } catch (error) {
          console.error("Failed to fetch affiliated companies:", error);
        }
      };

      affiliatedCompanies.length === 0 && getAffiliatedCompanies();
    }, [affiliatedCompanies.length]); // Only re-run when length changes

    return (
        <Dialog open={props.companyModal} onClose={props.closeCompanyModal} fullWidth maxWidth="lg">
            <DialogTitle style={{ display: "flex", justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                Choisir une entreprise
                <IconButton
                    aria-label="close"
                    style={{ position: "absolute", right: 8, top: 8 }}
                    onClick={props.closeCompanyModal}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box style={{ padding: 6 }}>
                    <TextField
                        variant="outlined"
                        label="Rechercher une entreprise"
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Box>
                <Box style={{ padding: 6, marginTop: '10px' }}>
                    {
                        (affiliatedCompanies.length !== 0) && affiliatedCompanies
                            .filter((company) => company.name.toLowerCase().includes(search.toLowerCase()))
                            .map((company: {id: number, profile_picture: string, name: string}) => (
                                <CompanyCard
                                    key={company.id}
                                    company={company}
                                    selectCompany={handleSelectCompany}
                                    deleteOption={false}
                                    delete={() => {}}
                                />
                            ))
                    }
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default CompanyModal