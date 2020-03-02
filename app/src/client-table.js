
import React, { useState, useEffect, createRef } from 'react';
import { makeStyles, Table, TableHead, TableBody, TableRow, TableCell, Tooltip, IconButton, Select, MenuItem, TextField, InputAdornment } from '@material-ui/core';
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

function ClientTable(props) {
    const classes = useStyles();
    const { onClientChange } = props;
    const [clients, setClients] = useState([]);
    const [speedDialOpen, setSpeedDialOpen] = useState(false);
    const [editable, setEditable] = useState(-1);
    const file_input_ref = createRef();

    useEffect(() => {
        if(onClientChange) {
            onClientChange(clients);
        }
    });

    const handleAddClient = () => {
        setEditable(clients.length);
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
        setEditable(-1);
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

    const handleEditClient = (index) => {
        setEditable(editable !== index ? index : -1);
    }

    const handleFileImport = () => {
        setEditable(-1);
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
        setEditable(-1);
        const csv = clients.map(client => (client.name + ';' + client.address + ';' + client.working_time + ';' + client.priority)).join('\n');
        const blob = new Blob([csv], {type: 'text/csv'});
        saveAs(blob, 'clients-export.csv');
    }

    const handleDeleteAll = () => {
        setEditable(-1);
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
                                                    {index === editable ?
                                                        <TextField className={classes.input} value={client.name} onChange={(e) => handleUpdateClient(index, {'name': e.target.value})}/> :
                                                        <span className={classes.span}>{client.name}</span>
                                                    }
                                                </TableCell>
                                                <TableCell className={classes.table_cell}>
                                                    <AddressInput
                                                        editable={index === editable}
                                                        className={classes.input}
                                                        value={client.address}
                                                        onChange={(e) => handleUpdateClient(index, {'address': e.target.value, 'lon': e.lon, 'lat': e.lat})}
                                                    />
                                                </TableCell>
                                                <TableCell className={classes.table_cell}>
                                                    {index === editable ?
                                                        <TextField
                                                            className={classes.input}
                                                            type="number"
                                                            value={client.working_time}
                                                            inputProps={{min: 0,}}
                                                            InputProps={{startAdornment: <InputAdornment position="start">Min.</InputAdornment>,}}
                                                            onChange={(e) => handleUpdateClient(index, {'working_time': e.target.value ? parseInt(e.target.value) : ''})}
                                                        /> :
                                                        <span className={classes.span}><span className={classes.span_grey}>Min.</span>&nbsp;&nbsp;{client.working_time}</span>
                                                    }
                                                </TableCell>
                                                <TableCell className={classes.table_cell}>
                                                    {index === editable ?
                                                        <Select className={classes.input} value={client.priority} onChange={(e) => handleUpdateClient(index, {'priority': e.target.value})}>
                                                            <MenuItem value={0.2}>Low</MenuItem>
                                                            <MenuItem value={0.5}>Medium</MenuItem>
                                                            <MenuItem value={1}>High</MenuItem>
                                                        </Select> :
                                                        <span className={classes.span}>{client.priority === 0.2 ? 'Low' : client.priority === 0.5 ? 'Medium' : 'High'}</span>
                                                    }
                                                </TableCell>
                                                <TableCell className={classes.table_last_cell}>
                                                    <Tooltip title={index === editable ? 'Save' : 'Edit client'}>
                                                        <IconButton onClick={() => handleEditClient(index)}>{index === editable ? <DoneIcon/> : <EditIcon/>}</IconButton>
                                                    </Tooltip>
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

