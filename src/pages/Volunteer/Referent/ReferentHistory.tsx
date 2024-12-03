import React from 'react';
import ReferentHistoryList from './ReferentHistoryList';
import TabPanel from "../../../components/TabPanel";
import { Tab, Tabs } from '@mui/material';
import './ReferentHistory.scss'

function ReferentHistory() {
    const [value, setValue] = React.useState(1);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div style={{ marginTop: '20px', marginLeft: '10px' }}>
            <p className="referent-history-title"> Historique de participation </p>
            <p className="referent-history-description">Retrouvez ici l'historique des missions pour lesquelles vous êtes référent.</p>
            <div className="referent-history-container">
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
                    <Tab label="En cours" value={1} />
                    <Tab label="Passées" value={2} />
                </Tabs>
                <TabPanel value={value} index={1}>
                    <ReferentHistoryList is_active={true} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ReferentHistoryList is_active={false} />
                </TabPanel>
            </div>
        </div>
    )
}

export default ReferentHistory;