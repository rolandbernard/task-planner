
import React, { useState, useEffect, createRef } from 'react';
import { makeStyles, Table, TableHead, TableBody, TableRow, TableCell, Tooltip, IconButton, TextField, InputAdornment } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import { saveAs } from 'file-saver';

import AddressInput from './address-input';

const useStyles = makeStyles(({
    root: {
        position: 'relative',
        height: '100%',
        width: '100%',
    },
    table: {
        tableLayout: 'fixed',
        userSelect: false,
    },
    table_cell: {
        padding: 0,
    },
    scrolldiv: {
        overflowY: 'auto',
        overflowX: 'hidden',
        height: 'calc(100% - 3.5em)',
        position: 'absolute',
    },
    table_hidden: {
        border: 'none',
        padding: 0,
    },
    table_last_cell: {
        width: '48px',
        height: '48px',
        padding: 0,
        position: 'relative',
    },
    input: {
        width: '90%',
    },
    speed_dial: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '48px',
    },
    file_input: {
        display: 'none',
    },
}));

function WorkerTable(props) {
    const classes = useStyles();
    const { onWorkerChange } = props;
    const [workers, setWorkers] = useState([]);
    const [speedDialOpen, setSpeedDialOpen] = useState(false);
    const file_input_ref = createRef();

    useEffect(() => {
        if(onWorkerChange) {
            onWorkerChange(workers);
        }
    });

    const handleAddWorker = () => {
        setWorkers(workers.concat([{
            name: "",
            address: "",
            maximum_time: 0,
            lon: undefined,
            lat: undefined,
        }]));
    };

    const handleSpeedDialClose = () => {
        setSpeedDialOpen(false);
    };

    const handleSpeedDialOpen = () => {
        setSpeedDialOpen(true);
    };

    const handleDeleteWorker = (index) => {
        setWorkers(workers.slice(0, index).concat(workers.slice(index+1)));
    };

    const handleUpdateWorker = (index, changes) => {
        setWorkers((() => {
            const w = workers.slice();
            for(let field in changes) {
                w[index][field] = changes[field];
            }
            return w;
        })());
    };

    const handleFileImport = () => {
        const file = file_input_ref.current.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            try {
                const csv = reader.result;
                setWorkers(workers.concat(csv.split('\n').filter(csvline => csvline.split(';').length === 3).map(csvline => {
                    const fields = csvline.split(';');
                    const worker = {
                        name: fields[0],
                        address: fields[1],
                        maximum_time: parseInt(fields[2]),
                    };
                    return worker;
                })));
            } catch(e) { }
        });
        reader.readAsText(file);
    }

    const handleFileExport = () => {
        const csv = workers.map(worker => (worker.name + ';' + worker.address + ';' + worker.maximum_time)).join('\n');
        const blob = new Blob([csv], {type: 'text/csv'});
        saveAs(blob, 'workers-export.csv');
    }

    return (
        <div className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.table_cell}>Name</TableCell>
                        <TableCell className={classes.table_cell}>Address</TableCell>
                        <TableCell className={classes.table_cell}>Maximum duration</TableCell>
                        <TableCell className={classes.table_last_cell}>
                            <input className={classes.file_input} type="file" accept="text/csv" ref={file_input_ref} onChange={handleFileImport}/>
                            <SpeedDial
                                ariaLabel="SpeedDial"
                                className={classes.speed_dial}
                                icon={<SpeedDialIcon />}
                                onClose={handleSpeedDialClose}
                                onOpen={handleSpeedDialOpen}
                                open={speedDialOpen}
                                direction="down"
                                FabProps={{size: 'small', color: 'default'}}
                            >
                                <SpeedDialAction
                                    icon={(<AddIcon/>)}
                                    tooltipTitle="Add a worker"
                                    onClick={handleAddWorker}
                                />
                                <SpeedDialAction
                                    icon={(<PublishIcon/>)}
                                    tooltipTitle="Import csv"
                                    onClick={() => {file_input_ref.current.click()}}
                                />
                                <SpeedDialAction
                                    icon={(<GetAppIcon/>)}
                                    tooltipTitle="Export csv"
                                    onClick={handleFileExport}
                                />
                            </SpeedDial>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow className={classes.table_hidden}>
                        <TableCell className={classes.table_hidden} colSpan={4}>
                            <div className={classes.scrolldiv}>
                                <Table className={classes.table}>
                                    <TableBody>
                                        {workers.map((worker, index) => (
                                            <TableRow key={index}>
                                                <TableCell className={classes.table_cell}>
                                                    <TextField className={classes.input} value={worker.name} onChange={(e) => handleUpdateWorker(index, {'name': e.target.value})}/>
                                                </TableCell>
                                                <TableCell className={classes.table_cell}>
                                                    <AddressInput
                                                        className={classes.input}
                                                        value={worker.address}
                                                        onChange={(e) => handleUpdateWorker(index, {'address': e.target.value, 'lon': e.lon, 'lat': e.lat})}
                                                    />
                                                </TableCell>
                                                <TableCell className={classes.table_cell}>
                                                    <TextField
                                                        className={classes.input}
                                                        type="number"
                                                        value={worker.maximum_time}
                                                        inputProps={{min: 0,}}
                                                        InputProps={{startAdornment: <InputAdornment position="start">Min.</InputAdornment>,}}
                                                        onChange={(e) => handleUpdateWorker(index, {'maximum_time': e.target.value ? parseInt(e.target.value) : ''})}
                                                    />
                                                </TableCell>
                                                <TableCell className={classes.table_last_cell}>
                                                    <Tooltip title="Delete worker">
                                                        <IconButton onClick={() => handleDeleteWorker(index)}><DeleteIcon/></IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default WorkerTable;

