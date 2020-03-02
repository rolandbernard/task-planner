
import React, { useState, useEffect, createRef } from 'react';
import { makeStyles, Table, TableHead, TableBody, TableRow, TableCell, Tooltip, IconButton, TextField, InputAdornment } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
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
        width: '96px',
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
        left: 'calc(50% - 24px)',
        width: '48px',
    },
    file_input: {
        display: 'none',
    },
    span: {
        overflowX: 'hidden',
        textOverflow: 'ellipsis',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        width: '90%',
        height: 'min-content',
        fontSize: '1rem',
    },
    span_grey: {
        color: '#757575',
    },
}));

function WorkerTable(props) {
    const classes = useStyles();
    const { onWorkerChange } = props;
    const [workers, setWorkers] = useState([]);
    const [speedDialOpen, setSpeedDialOpen] = useState(false);
    const [editable, setEditable] = useState(-1);
    const file_input_ref = createRef();

    useEffect(() => {
        if(onWorkerChange) {
            onWorkerChange(workers);
        }
    });

    const handleAddWorker = () => {
        setEditable(workers.length);
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
        setEditable(-1);
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

    const handleEditWorker = (index) => {
        setEditable(editable !== index ? index : -1);
    }

    const handleFileImport = () => {
        setEditable(-1);
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
        setEditable(-1);
        const csv = workers.map(worker => (worker.name + ';' + worker.address + ';' + worker.maximum_time)).join('\n');
        const blob = new Blob([csv], {type: 'text/csv'});
        saveAs(blob, 'workers-export.csv');
    }

    const handleDeleteAll = () => {
        setEditable(-1);
        setWorkers([]);
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
                                <SpeedDialAction
                                    icon={(<DeleteIcon/>)}
                                    tooltipTitle="Delete all workers"
                                    onClick={handleDeleteAll}
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
                                                    {index === editable ?
                                                        <TextField className={classes.input} value={worker.name} onChange={(e) => handleUpdateWorker(index, {'name': e.target.value})}/> :
                                                        <span className={classes.span}>{worker.name}</span>
                                                    }
                                                </TableCell>
                                                <TableCell className={classes.table_cell}>
                                                    <AddressInput
                                                        editable={index === editable}
                                                        className={classes.input}
                                                        value={worker.address}
                                                        onChange={(e) => handleUpdateWorker(index, {'address': e.target.value, 'lon': e.lon, 'lat': e.lat})}
                                                    />
                                                </TableCell>
                                                <TableCell className={classes.table_cell}>
                                                    {index === editable ?
                                                        <TextField
                                                            className={classes.input}
                                                            type="number"
                                                            value={worker.maximum_time}
                                                            inputProps={{min: 0,}}
                                                            InputProps={{startAdornment: <InputAdornment position="start">Min.</InputAdornment>,}}
                                                            onChange={(e) => handleUpdateWorker(index, {'maximum_time': e.target.value ? parseInt(e.target.value) : ''})}
                                                        /> :
                                                        <span className={classes.span}><span className={classes.span_grey}>Min.</span>&nbsp;&nbsp;{worker.maximum_time}</span>
                                                    }
                                                </TableCell>
                                                <TableCell className={classes.table_last_cell}>
                                                    <Tooltip title={index === editable ? 'Save' : 'Edit worker'}>
                                                        <IconButton onClick={() => handleEditWorker(index)}>{index === editable ? <DoneIcon/> : <EditIcon/>}</IconButton>
                                                    </Tooltip>
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

