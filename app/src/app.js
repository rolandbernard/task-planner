
import React, { useState, useMemo, useRef } from 'react';
import { makeStyles, Tab, Tabs, AppBar, Box, CircularProgress, Button, Select, MenuItem, Popper, Paper, Grow, ButtonGroup, MenuList, ClickAwayListener } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
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
        maxWidth: '20em',
        width: '45%',
    },
    tab_pannel: {
        height: 'calc(100% - 3em)',
    },
    boxes: {
        boxSizing: 'border-box',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            height: '50%',
            padding: '0.5em',
        },
        [theme.breakpoints.up('lg')]: {
            width: '50%',
            height: '100%',
            padding: '0.5em',
            display: 'inline-block',
            verticalAlign: 'top',
        }
    },
    map_box: {
        width: '100%',
        height: 'calc(100% - 3em)',
        padding: 0,
        boxSizing: 'border-box',
    },
    control_box: {
        width: '100%',
        height: '3em',
        padding: 0,
        boxSizing: 'border-box',
    },
    linear_progress: {
        height: '0.25em',
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
        paddingLeft: '1em',
    },
    filters: {
        float: 'right',
        width: 'max-content',
        marginRight: '1em',
    },
    filter_input: {
        width: '10em',
        verticalAlign: 'middle',
        marginLeft: '1em',
    },
    popper: {
        zIndex: 100000,
    }
}));


function App() {
    const planner = useMemo(() => wrap(Worker()), []);
    const classes = useStyles();
    const [tab, setTab] = useState(0);
    const [clients, setClients] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [quality, setQuality] = useState(0);
    const [plan, setPlan] = useState([]);
    const [plan_split, setPlanSplit] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter_worker, setFilterWorker] = useState(-1);
    const [filter_day, setFilterDay] = useState(-1);
    const changed = useRef(true);
    const button_anchor_ref = useRef(null);
    const [button_open, setButtonOpen] = useState(false);
    const [rounds, setRounds] = useState(500);

    const handleClientChange = (c) => {
        setClients(c);
        changed.current = true;
    };

    const handleWorkerChange = (w) => {
        setWorkers(w);
        changed.current = true;
    };

    const handleTabChange = async (__, new_tab) => {
        setTab(new_tab);
        if(new_tab === 1) {
            setLoading(true);
            try {
                if(changed.current) {
                    setQuality(0);
                    setPlan([]);
                    setPlanSplit([]);
                    await await planner.setWorkersAndClients(workers, clients);
                    setQuality(await planner.getPlanQuality());
                    setPlan(await planner.getPlan());
                    setPlanSplit(await planner.getPlanPerWorkerPerDay());
                    changed.current = false;
                }
            } catch(e) {
                setTab(0);
                console.error(e);
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

    const filterd_plan_split = useMemo(() => {
        return plan_split.filter((__, index) => (filter_worker === -1 || index === filter_worker))
            .map(worker => worker.filter((__, index) => (filter_day === -1 || filter_day === index)));
    }, [filter_worker, filter_day, plan_split]);

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

    return (
        <div className={classes.app}>
            <AppBar position="static">
                <Tabs value={tab} onChange={handleTabChange}>
                    <Tab label="Input data" disabled={loading} className={classes.tab}/>
                    <Tab disabled={clients.length <= 1 || workers.length === 0 || loading} label="Optimization" className={classes.tab}/>
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
                                                    {[500, 5000, 10000, 50000, 100000, 500000].map(r => (
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
                                {plan_split.filter(worker => worker[0].length > 0).map((worker, index) => (<MenuItem key={index} value={index}>{worker[0][0].worker.name}</MenuItem>))}
                            </Select>
                            <Select
                                label="Day"
                                className={classes.filter_input}
                                value={filter_day}
                                onChange={handleFilterDayChange}
                            >
                                <MenuItem value={-1}><em>None</em></MenuItem>
                                {(filter_worker !== -1) && plan_split[filter_worker].map((__, index) => (<MenuItem key={index} value={index}>{'Day ' + (index+1)}</MenuItem>))}
                            </Select>
                        </span>
                    </Box>
                    <Box className={classes.map_box}>
                        <PlanMap plan={filterd_plan_split}/>
                    </Box>
                </Box>
                <Box className={classes.boxes}>
                    <PlanTable plan={plan}/>
                </Box>
            </TabPanel>
        </div>
    )
}

export default App;

