
import React, { useState } from 'react';
import { makeStyles, Tab, Tabs, AppBar, Box } from '@material-ui/core';
import { wrap } from 'comlink';

import TabPanel from './tab-panel'
import Worker from './task-planner.worker'
import ClientTable from './client-table';
import WorkerTable from './worker-table';

const useStyles = makeStyles(theme => ({
    app: {
        width: '100%',
        height: '100%',
    },
    tab: {
        maxWidth: '20em',
        width: '45%',
    },
    tab_pannel: {
        height: 'calc(100% - 3.5em)',
    },
    boxes: {
        [theme.breakpoints.down('md')]: {
            width: '100%',
            height: '50%',
            padding: '0.5em',
            boxSizing: 'border-box',
        },
        [theme.breakpoints.up('lg')]: {
            width: '50%',
            height: '100%',
            padding: '0.5em',
            boxSizing: 'border-box',
            display: 'inline-block',
        }
    },
}));

function App() {
    const planner = wrap(Worker());
    const classes = useStyles();
    const [tab, setTab] = useState(0);
    const [clients, setClients] = useState([]);
    const [workers, setWorkers] = useState([]);

    const handleClientChange = (c) => {
        setClients(c);
    };

    const handleWorkerChange = (w) => {
        setWorkers(w);
    };

    const handleTabChange = (__, new_tab) => {
        setTab(new_tab);
    };

    return (
        <div className={classes.app}>
            <AppBar position="static">
                <Tabs value={tab} onChange={handleTabChange}>
                    <Tab label="Input data" className={classes.tab}/>
                    <Tab label="Optimization" className={classes.tab}/>
                </Tabs>
            </AppBar>
            <TabPanel className={classes.tab_pannel} value={tab} index={0}>
                <Box className={classes.boxes}>
                    <ClientTable onClientChange={handleClientChange}/>
                </Box>
                <Box className={classes.boxes}>
                    <WorkerTable onWorkerChange={handleWorkerChange}/>
                </Box>
            </TabPanel>
            <TabPanel className={classes.tab_pannel} value={tab} index={1}>
                Item Two
            </TabPanel>
        </div>
    )
}

export default App;

