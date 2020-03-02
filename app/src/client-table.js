
import React, { useState, useEffect, createRef } from 'react';
import { makeStyles, Table, TableHead, TableBody, TableRow, TableCell, Tooltip, IconButton, Select, MenuItem, TextField, InputAdornment } from '@material-ui/core';
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

function ClientTable(props) {
    const classes = useStyles();
    const { onClientChange } = props;
    const [clients, setClients] = useState([]);
    const [speedDialOpen, setSpeedDialOpen] = useState(false);
    const file_input_ref = createRef();

    useEffect(() => {
        if(onClientChange) {
            onClientChange(clients);
        }
    });

    const handleAddClient = () => {
        setClients(clients.concat([{
            name: "",
            address: "",
            working_time: 0,
            priority: 0.5,
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

    const handleDeleteClient = (index) => {
        setClients(clients.slice(0, index).concat(clients.slice(index+1)));
    };

    const handleUpdateClient = (index, changes) => {
        setClients((() => {
            const c = clients.slice();
            for(let field in changes) {
                c[index][field] = changes[field];
            }
            return c;
        })());
    };

    const handleFileImport = () => {
        const file = file_input_ref.current.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            try {
                const csv = reader.result;
                setClients(clients.concat(csv.split('\n').filter(csvline => csvline.split(';').length === 4).map(csvline => {
                    const fields = csvline.split(';');
                    const client = {
                        name: fields[0],
                        address: fields[1],
                        working_time: parseInt(fields[2]),
                        priority: parseFloat(fields[3]),
                    };
                    return client;
                })));
            } catch(e) { }
        });
        reader.readAsText(file);
    }

    const handleFileExport = () => {
        const csv = clients.map(client => (client.name + ';' + client.address + ';' + client.working_time + ';' + client.priority)).join('\n');
        const blob = new Blob([csv], {type: 'text/csv'});
        saveAs(blob, 'clients-export.csv');
    }

    const handleDeleteAll = () => {
        setClients([]);
    }

    return (
        <div className={classes.root}>
            <Table className={classes.table}>
                <TableHead className={classes.table_head}>
                    <TableRow>
                        <TableCell className={classes.table_cell}>Name</TableCell>
                        <TableCell className={classes.table_cell}>Address</TableCell>
                        <TableCell className={classes.table_cell}>Estimated duration</TableCell>
                        <TableCell className={classes.table_cell}>Priority</TableCell>
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
                                    tooltipTitle="Add a client"
                                    onClick={handleAddClient}
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
                                    tooltipTitle="Delete all clients"
                                    onClick={handleDeleteAll}
                                />
                            </SpeedDial>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow className={classes.table_hidden}>
                        <TableCell className={classes.table_hidden} colSpan={5}>
                            <div className={classes.scrolldiv}>
                                <Table className={classes.table}>
                                    <TableBody>
                                        {clients.map((client, index) => (
                                            <TableRow key={index}>
                                                <TableCell className={classes.table_cell}>
                                                    <TextField className={classes.input} value={client.name} onChange={(e) => handleUpdateClient(index, {'name': e.target.value})}/>
                                                </TableCell>
                                                <TableCell className={classes.table_cell}>
                                                    <AddressInput
                                                        className={classes.input}
                                                        value={client.address}
                                                        onChange={(e) => handleUpdateClient(index, {'address': e.target.value, 'lon': e.lon, 'lat': e.lat})}
                                                    />
                                                </TableCell>
                                                <TableCell className={classes.table_cell}>
                                                    <TextField
                                                        className={classes.input}
                                                        type="number"
                                                        value={client.working_time}
                                                        inputProps={{min: 0,}}
                                                        InputProps={{startAdornment: <InputAdornment position="start">Min.</InputAdornment>,}}
                                                        onChange={(e) => handleUpdateClient(index, {'working_time': e.target.value ? parseInt(e.target.value) : ''})}
                                                    />
                                                </TableCell>
                                                <TableCell className={classes.table_cell}>
                                                    <Select className={classes.input} value={client.priority} onChange={(e) => handleUpdateClient(index, {'priority': e.target.value})}>
                                                        <MenuItem value={0.2}>Low</MenuItem>
                                                        <MenuItem value={0.5}>Medium</MenuItem>
                                                        <MenuItem value={1}>High</MenuItem>
                                                    </Select>
                                                </TableCell>
                                                <TableCell className={classes.table_last_cell}>
                                                    <Tooltip title="Delete client">
                                                        <IconButton onClick={() => handleDeleteClient(index)}><DeleteIcon/></IconButton>
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

export default ClientTable;

