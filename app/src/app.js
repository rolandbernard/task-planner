
import React, { useState, useMemo, useRef } from 'react';
import {
    makeStyles, Tab, Tabs, AppBar, Box, CircularProgress, Button, Select,
    MenuItem, Popper, Paper, Grow, ButtonGroup, MenuList, ClickAwayListener,
    Snackbar, IconButton, Popover
} from '@material-ui/core';
import { Alert } from "@material-ui/lab";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import InfoIcon from '@material-ui/icons/Info';
import { wrap } from 'comlink';

import TabPanel from './tab-panel'
import Worker from './task-planner.worker'
import ClientTable from './client-table';
import WorkerTable from './worker-table';
import PlanMap from './plan-map';
import PlanTable from './plan-table';

const useStyles = makeStyles(theme => ({
    app: {
        width: '100%',
        height: '100%',
    },
    tab: {
        maxWidth: '20rem',
        width: '50%',
    },
    tab_pannel: {
        height: 'calc(100% - 3rem)',
    },
    boxes: {
        outline: '1px solid #F0F0F0',
        boxSizing: 'border-box',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            height: '50%',
            padding: '0.5rem',
        },
        [theme.breakpoints.up('lg')]: {
            width: '50%',
            height: '100%',
            padding: '0.5rem',
            display: 'inline-block',
            verticalAlign: 'top',
        }
    },
    map_box: {
        width: '100%',
        height: 'calc(100% - 3rem)',
        padding: 0,
        boxSizing: 'border-box',
    },
    control_box: {
        width: '100%',
        height: '3rem',
        padding: 0,
        boxSizing: 'border-box',
    },
    linear_progress: {
        height: '0.25rem',
    },
    button_progress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    button_wrapper: {
        position: 'relative',
        width: 'max-content',
    },
    quality: {
        paddingLeft: '1rem',
    },
    filters: {
        float: 'right',
        width: 'max-content',
        marginRight: '1rem',
    },
    filter_input: {
        width: '10rem',
        verticalAlign: 'middle',
        marginLeft: '1rem',
    },
    popper: {
        zIndex: 1000000,
    },
    about: {
        position: 'absolute',
        top: '0.5rem',
        right: '0.5rem',
        color: '#F0F0F0',
        zIndex: 100000,
    },
    about_text: {
        padding:"1rem",
    },
}));

let initialClients = [
    { id: 0, name: "402643", address: "Via Sabbionara 1, 36071 ARZIGNANO", working_time: 180, priority: 0.2, lon: 11.3697115, lat: 45.5117757 },
    { id: 1, name: "402635", address: "Via Crispi 15, 39100 BOLZANO", working_time: 60, priority: 0.2, lon: 11.3583474, lat: 46.49805 },
    { id: 2, name: "402628", address: "Säbenertorgasse 2, 39042 BRIXEN", working_time: 120, priority: 0.2, lon: 11.6568621, lat: 46.7158647 },
    { id: 3, name: "402624", address: "Freiheitsstrasse 40, 39042 MERAN", working_time: 150, priority: 0.2, lon: 11.1638196, lat: 46.6705174 },
    { id: 4, name: "402622", address: "Via Santa Croce, 77 , 38123 TRENTO", working_time: 90, priority: 0.2, lon: 11.1240829185249, lat: 46.06266515 },
    { id: 5, name: "402614", address: "Galileo-Galilei-Str. 2 , 39100 BOZEN", working_time: 30, priority: 0.2, lon: 11.3413219, lat: 46.4873981 },
    { id: 6, name: "402605", address: "Via Stazione 28 , 39010 GARGAZZONE", working_time: 120, priority: 0.2, lon: 11.1986062, lat: 46.5787909 },
    { id: 7, name: "402586", address: "Via Crispi 15, 39100 BOLZANO", working_time: 60, priority: 0.2, lon: 11.3583474, lat: 46.49805 },
    { id: 8, name: "402584", address: "Fabrikstraße 7, 39045 FRANZENSFESTE", working_time: 30, priority: 0.2, lon: 11.5658908, lat: 46.8098363 },
    { id: 9, name: "402566", address: "Elvaser Straße 8 , 39042 BRIXEN", working_time: 90, priority: 0.2, lon: 11.6593449, lat: 46.71834 },
    { id: 10, name: "402557", address: "Rienzfeldstraße 30 , 39031 BRUNECK", working_time: 120, priority: 0.2, lon: 11.9281335, lat: 46.8020609 },
    { id: 11, name: "402556", address: "Obertal 45 , 39030 ANTHOLZ", working_time: 60, priority: 0.5, lon: 12.1275168, lat: 46.8736719 },
    { id: 12, name: "402555", address: "Via Gilm 1/A , 39100 BOLZANO", working_time: 60, priority: 0.2, lon: 11.3499216, lat: 46.4957955 },
    { id: 13, name: "402552", address: "Via Durone, 53 , 38079 TIONE DI TRENTO", working_time: 1080, priority: 0.2, lon: 10.730921871875, lat: 46.03736955 },
    { id: 14, name: "402551", address: "piazza Municipio 1, 39040 SALORNO", working_time: 120, priority: 0.2, lon: 11.212524, lat: 46.2390728 },
    { id: 15, name: "402542", address: "Via Santa Croce, 77 , 38123 TRENTO", working_time: 120, priority: 0.2, lon: 11.1240829185249, lat: 46.06266515 },
    { id: 16, name: "402533", address: "Siemensstraße 4/C, 39100 BOZEN", working_time: 150, priority: 0.2, lon: 11.3324146, lat: 46.4828521 },
    { id: 17, name: "402517", address: "Gasteig, Innerrust 2 , 39040 RATSCHINGS", working_time: 30, priority: 0.2, lon: 11.4037304, lat: 46.8802862 },
    { id: 18, name: "402503", address: "Via Siemens 29 , 39100 BOLZANO", working_time: 30, priority: 0.2, lon: 11.3271168612225, lat: 46.4807944 },
    { id: 19, name: "402493", address: "Via Siemens 29 , 39100 BOLZANO", working_time: 30, priority: 0.2, lon: 11.3271168612225, lat: 46.4807944 },
    { id: 20, name: "402486", address: "Via Galvani 6/c, 39100 BOLZANO", working_time: 30, priority: 0.2, lon: 11.3320781, lat: 46.4750087 },
    { id: 21, name: "402485", address: "Via Siemens 29 , 39100 BOLZANO", working_time: 60, priority: 0.5, lon: 11.3271168612225, lat: 46.4807944 },
    { id: 22, name: "402474", address: "Mitterweg 14/B , 39100 BOZEN", working_time: 60, priority: 0.2, lon: 11.5678423, lat: 46.6083621 },
    { id: 23, name: "402473", address: "Negrellistr. 16 , 39100 BOZEN", working_time: 30, priority: 0.5, lon: 11.3547801, lat: 46.4981125 },
    { id: 24, name: "402472", address: "Via Crispi 15, 39100 BOLZANO", working_time: 60, priority: 0.2, lon: 11.3583474, lat: 46.49805 },
    { id: 25, name: "402471", address: "Pacinottistrasse 12 , 39100 BOZEN", working_time: 30, priority: 0.2, lon: 11.3303934, lat: 46.4820846 },
    { id: 26, name: "402468", address: "Via Crispi 15, 39100 BOLZANO", working_time: 60, priority: 0.2, lon: 11.3583474, lat: 46.49805 },
    { id: 27, name: "402465", address: "Via Crispi 15, 39100 BOLZANO", working_time: 210, priority: 0.2, lon: 11.3583474, lat: 46.49805 },
    { id: 28, name: "402456", address: "Via Crispi 15, 39100 BOLZANO", working_time: 60, priority: 0.2, lon: 11.3583474, lat: 46.49805 },
    { id: 29, name: "402455", address: "Kapuzinergasse 10, 39100 BOZEN", working_time: 60, priority: 0.2, lon: 11.3522297, lat: 46.4964121 },
];
let initialWorkers = [
    { id: 0, name: "PETERH", address: "Brennerstraße 72, 39042 Brixen", maximum_time: 480, lon: 11.6525118, lat: 46.7283475 },
    { id: 1, name: "MARTINH", address: "Luigi-Negrelli-Straße 6, 39100 Bozen", maximum_time: 480, lon: 11.3323606, lat: 46.4708107 },
    { id: 2, name: "LUKASP", address: "Luigi-Negrelli-Straße 6, 39100 Bozen", maximum_time: 480, lon: 11.3323606, lat: 46.4708107 },
    { id: 3, name: "CHRISTIANV", address: "Luigi-Negrelli-Straße 6, 39100 Bozen", maximum_time: 480, lon: 11.3323606, lat: 46.4708107 },
    { id: 4, name: "EDDYP", address: "Luigi-Negrelli-Straße 6, 39100 Bozen", maximum_time: 480, lon: 11.3323606, lat: 46.4708107 },
];
if(localStorage.getItem('last_input_clients')) {
    initialClients = JSON.parse(localStorage.getItem('last_input_clients'));
}

if(localStorage.getItem('last_input_workers')) {
    initialWorkers = JSON.parse(localStorage.getItem('last_input_workers'));
}

function App() {
    const planner = useMemo(() => wrap(Worker()), []);
    const classes = useStyles();
    const [tab, setTab] = useState(0);
    const [clients, setClients] = useState(initialClients);
    const [workers, setWorkers] = useState(initialWorkers);
    const [quality, setQuality] = useState(0);
    const [plan, setPlan] = useState([]);
    const [plan_split, setPlanSplit] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter_worker, setFilterWorker] = useState(-1);
    const [filter_day, setFilterDay] = useState(-1);
    const [highlight, setHighlight] = useState(-1);
    const changed = useRef(true);
    const button_anchor_ref = useRef(null);
    const [button_open, setButtonOpen] = useState(false);
    const [rounds, setRounds] = useState(500);
    const [error, setError] = useState(null);
    const [about_open, setAboutOpen] = useState(false);
    const [anchorAbout, setAnchorAbout] = useState(null);

    const handleClientChange = (c) => {
        setClients(c);
        changed.current = true;
        localStorage.setItem('last_input_clients', JSON.stringify(c));
    };

    const handleWorkerChange = (w) => {
        setWorkers(w);
        changed.current = true;
        localStorage.setItem('last_input_workers', JSON.stringify(w));
    };

    const handleTabChange = async (__, new_tab) => {
        setTab(new_tab);
        if(new_tab === 1) {
            setLoading(true);
            try {
                localStorage.setItem('last_input_clients', JSON.stringify(clients));
                localStorage.setItem('last_input_workers', JSON.stringify(workers));
                if(changed.current) {
                    setQuality(0);
                    setPlan([]);
                    setPlanSplit([]);
                    setFilterWorker(-1);
                    setFilterDay(-1);
                    await await planner.setWorkersAndClients(workers, clients);
                    setQuality(await planner.getPlanQuality());
                    setPlan(await planner.getPlan());
                    setPlanSplit(await planner.getPlanPerWorkerPerDay());
                    changed.current = false;
                }
            } catch(e) {
                setError("Failed to load optimizer: " + e.message);
                setTab(0);
            }
            setLoading(false);
        }
    };

    const handleOptimize = async () => {
        setLoading(true);
        await planner.optimize(rounds);
        setFilterWorker(-1);
        setFilterDay(-1);
        setQuality(await planner.getPlanQuality());
        setPlan(await planner.getPlan());
        setPlanSplit(await planner.getPlanPerWorkerPerDay());
        setLoading(false);
    };

    const handleFilterWorkerChange = (e) => {
        setFilterWorker(e.target.value);
        setFilterDay(-1);
    }

    const handleFilterDayChange = (e) => {
        setFilterDay(e.target.value);
    }

    const filtered_plan_split = useMemo(() => {
        return plan_split.filter((worker) => worker.length > 0 && worker[0].length > 0 && (filter_worker === -1 || worker[0][0].worker.id === filter_worker))
            .map(worker => worker.filter((__, index) => (filter_day === -1 || filter_day === index)));
    }, [filter_worker, filter_day, plan_split]);

    const filtered_plan = useMemo(() => {
        return plan.filter((task) => (filter_worker === -1 || task.worker.id === filter_worker) && (filter_day === -1 || filter_day === task.day));
    }, [filter_worker, filter_day, plan]);

    const handleButtonToggle = () => {
        setButtonOpen(!button_open);
    };

    const handleButtonClose = () => {
        setButtonOpen(false);
    };

    const handleButtonClick = (r) => {
        setRounds(r);
        setButtonOpen(false);
    };

    const onTaskHover = (t) => {
        setHighlight(t ? t.client.id : -1);
    }

    const handleErrorSet = (e) => {
        setError("Operation failed: " + e.message);
    }

    const handleErrorReset = () => {
        setError(null);
    }

    const handleOpenAbout = (e) => {
        setAnchorAbout(e.currentTarget);
        setAboutOpen(true);
    }

    const handleCloseAbout = () => {
        setAboutOpen(false);
    }

    return (
        <div className={classes.app}>
            <Snackbar open={error != null} autoHideDuration={6000} onClose={handleErrorReset}>
                <Alert onClose={handleErrorReset} severity="error">
                    { error }
                </Alert>
            </Snackbar>
            <IconButton className={classes.about} size="small" onClick={handleOpenAbout}>
                <InfoIcon />
            </IconButton>
            <Popover
                open={about_open}
                anchorEl={anchorAbout}
                onClose={handleCloseAbout}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className={classes.about_text}>
                    <p>
                        This software can be used to try to optimize the routing of multiple
                        workers, that have to visit multiple clients.
                    </p>
                    <p>
                        First enter all your workers and clients into the respective table and
                        then switch to the "Optimization"-tab.
                    </p>
                    <p>
                        The routes that are initially displayed are probably not very good, because they have
                        not yet been optimized.
                    </p>
                    <p>
                        To optimize the routes select how many rounds of optimization you want to
                        apply and click the optimize button.
                    </p>
                    <p>
                        You will see a loading animation, and when the optimization has finished
                        the table and map should update.
                    </p>
                    <p>
                        You can run as many optimization passes as you would like.
                    </p>
                </div>
            </Popover>
            <AppBar position="static">
                <Tabs value={tab} onChange={handleTabChange}>
                    <Tab label="Input data" disabled={loading} className={classes.tab}/>
                    <Tab disabled={clients.length <= 1 || workers.length === 0 || loading} label="Optimization" className={classes.tab}/>
                </Tabs>
            </AppBar>
            <TabPanel className={classes.tab_pannel} value={tab} index={0}>
                <Box className={classes.boxes}>
                    <ClientTable initialClients={clients} onClientChange={handleClientChange}/>
                </Box>
                <Box className={classes.boxes}>
                    <WorkerTable initialWorkers={workers} onWorkerChange={handleWorkerChange}/>
                </Box>
            </TabPanel>
            <TabPanel className={classes.tab_pannel} value={tab} index={1}>
                <Box className={classes.boxes}>
                    <Box className={classes.control_box}>
                        <span className={classes.button_wrapper}>
                            <ButtonGroup disabled={loading} variant="contained" color="primary" ref={button_anchor_ref}>
                                <Button className={classes.button} onClick={handleOptimize}>Optimize {rounds}</Button>
                                <Button
                                    color="primary"
                                    size="small"
                                    aria-controls={button_open ? 'split-button-menu' : undefined}
                                    aria-expanded={button_open ? 'true' : undefined}
                                    aria-haspopup="menu"
                                    onClick={handleButtonToggle}
                                >
                                    <ArrowDropDownIcon />
                                </Button>
                            </ButtonGroup>
                            <Popper className={classes.popper} open={button_open} anchorEl={button_anchor_ref.current} placement="bottom" role={undefined} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleButtonClose}>
                                                <MenuList id="split-button-menu">
                                                    {[500, 5000, 10000, 50000, 100000, 500000, 1000000, 5000000, 10000000].map(r => (
                                                        <MenuItem
                                                            key={r}
                                                            selected={rounds === r}
                                                            onClick={() => handleButtonClick(r)}
                                                        >
                                                            Optimize {r}
                                                        </MenuItem>
                                                    ))}
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                            {loading && <CircularProgress color="secondary" size={24} className={classes.button_progress} />}
                        </span>
                        <span className={classes.quality}>
                            Quality: {Number.parseFloat(quality).toPrecision(5)}
                        </span>
                        <span className={classes.filters}>
                            Filter:
                            <Select
                                label="Worker"
                                className={classes.filter_input}
                                value={filter_worker}
                                onChange={handleFilterWorkerChange}
                            >
                                <MenuItem value={-1}><em>None</em></MenuItem>
                                {workers.map((worker) => (<MenuItem key={worker.id} value={worker.id}>{worker.name}</MenuItem>))}
                            </Select>
                            <Select
                                label="Day"
                                className={classes.filter_input}
                                value={filter_day}
                                onChange={handleFilterDayChange}
                            >
                                <MenuItem value={-1}><em>None</em></MenuItem>
                                {(filter_worker !== -1) &&
                                        plan_split.filter((worker) => worker.length > 0 && worker[0].length > 0 && worker[0][0].worker.id === filter_worker)
                                        .map((worker) => worker.map((__, index) => (<MenuItem key={index} value={index}>{'Day ' + (index+1)}</MenuItem>)))}
                            </Select>
                        </span>
                    </Box>
                    <Box className={classes.map_box}>
                        <PlanMap
                            plan={filtered_plan_split}
                            onTaskHover={onTaskHover}
                            onError={handleErrorSet}
                            highlightClient={highlight}
                        />
                    </Box>
                </Box>
                <Box className={classes.boxes}>
                    <PlanTable
                        plan={filtered_plan}
                        highlightClient={highlight}
                        onTaskHover={onTaskHover}
                    />
                </Box>
            </TabPanel>
        </div>
    )
}

export default App;

