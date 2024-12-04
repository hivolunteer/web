import { useState } from "react";
import { Tab, Tabs } from '@mui/material';
import './History.scss';
import TabPanel from "../../../components/TabPanel";
import PassedMissionPanel from "./Panel/PassedMissionPanel";
import ActiveMissionPanel from "./Panel/ActiveMissionPanel";

function History() {

    const [value, setValue] = useState(1);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div style={{ marginTop: '20px', marginLeft: '10px' }}>
            <p className="history-title">Historique des missions</p>
            <p className="history-description">Retrouvez ici l'historique des missions auxquelles vous participez selon leur statut.</p>
            <div className="history-container">
                <Tabs value={value} onChange={handleChange} aria-label="Mission Status" variant="fullWidth">
                    <Tab label="Actives" value={1} />
                    <Tab label="Passées" value={2} />
                </Tabs>
                <TabPanel value={value} index={1}>
                    <ActiveMissionPanel />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <PassedMissionPanel />
                </TabPanel>
            </div>
        </div>
    );
}

export default History;
