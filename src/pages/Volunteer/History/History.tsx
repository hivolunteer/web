import {useState} from "react";
import { Tab, Tabs } from '@mui/material'
import './History.scss'
import TabPanel from "../../../components/TabPanel";
import PassedMissionPanel from "./Panel/PassedMissionPanel";
import ActiveMissionPanel from "./Panel/ActiveMissionPanel";

function History() {

    interface Subtype {
        id: number;
        name: string;
      }
    
      let subtypes : Array<Subtype> = [
        {
          id: 1,
          name: "Actives"
        },
        {
          id: 2,
          name: "Passées"
        }
      ]
      const [subType, setSubType] = useState<Subtype>(subtypes[0])
    
    return (
        <div>
            <div className="tabs-container history">
                <Tabs
                    value={subType.name}
                    onChange={(e, value) => {
                        setSubType(subtypes.filter((subtype) => subtype.name === value)[0]);
                    }}
                    variant="fullWidth"
                    sx={{ borderBottom: 0, width: '80%'}}
                >
                    <Tab
                        label="Actives"
                        value="Actives"
                        sx={{
                            background: "#FFFFFF",
                        }}
                    />
                    <Tab
                        label="Passées"
                        value="Passées"
                        sx={{
                            background: "#FFFFFF",
                        }}
                    />
                </Tabs>
                <TabPanel
                    value={subType.id}
                    index={1}
                >
                    <ActiveMissionPanel />
                </TabPanel>
                <TabPanel
                    value={subType.id}
                    index={2}
                >
                    <PassedMissionPanel />
                </TabPanel>
            </div>
        </div>
    )
}

export default History