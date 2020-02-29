
import React, { useState, useEffect } from 'react';
import { makeStyles, Table, TableHead, TableBody, TableRow, TableCell, Tooltip, IconButton, TextField, InputAdornment } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

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

function WorkerTable(props) {
    const classes = useStyles();
    const { onWorkerChange } = props;
    const [workers, setWorkers] = useState([]);

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
    }

    const handleDeleteWorker = (index) => {
        setWorkers(workers.slice(0, index).concat(workers.slice(index+1)));
    }

    const handleUpdateWorker = (index, field, value) => {
        setWorkers((() => {
            const w = workers.slice();
            w[index][field] = value;
            return w;
        })());
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
                            <Tooltip title="Add worker">
                                <IconButton onClick={handleAddWorker}><AddIcon/></IconButton>
                            </Tooltip>
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
                                                    <TextField className={classes.input} value={worker.name} onChange={(e) => handleUpdateWorker(index, 'name', e.target.value)}/>
                                                </TableCell>
                                                <TableCell className={classes.table_cell}>
                                                    <TextField className={classes.input} value={worker.address} onChange={(e) => handleUpdateWorker(index, 'address', e.target.value)}/>
                                                </TableCell>
                                                <TableCell className={classes.table_cell}>
                                                    <TextField
                                                        className={classes.input}
                                                        type="number"
                                                        value={worker.maximum_time}
                                                        inputProps={{min: 0,}}
                                                        InputProps={{startAdornment: <InputAdornment position="start">Min.</InputAdornment>,}}
                                                        onChange={(e) => handleUpdateWorker(index, 'maximum_time', e.target.value)}
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

