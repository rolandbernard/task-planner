
import React, { useState, useEffect } from 'react';
import { makeStyles, Table, TableHead, TableBody, TableRow, TableCell, Tooltip, IconButton, Select, MenuItem, TextField, InputAdornment } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

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
        width: 'min-content',
        padding: 0,
    },
    input: {
        width: '90%',
    },
}));

function ClientTable(props) {
    const classes = useStyles();
    const { onClientChange } = props;
    const [clients, setClients] = useState([]);

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
                            <Tooltip title="Add client">
                                <IconButton onClick={handleAddClient}><AddIcon/></IconButton>
                            </Tooltip>
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
                                                        onChange={(e) => handleUpdateClient(index, 'working_time', e.target.value)}
                                                    />
                                                </TableCell>
                                                <TableCell className={classes.table_cell}>
                                                    <Select className={classes.input} value={client.priority} onChange={(e) => handleUpdateClient(index, {'priority': e.target.value})}>
                                                        <MenuItem value={0.2}>Low</MenuItem>
                                                        <MenuItem value={0.5}>Medium</MenuItem>
                                                        <MenuItem value={2}>High</MenuItem>
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

