
import React, { createRef } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Tooltip, IconButton, TextField, InputAdornment } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import { saveAs } from 'file-saver';

import AddressInput from './address-input';

const styles = {
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
};

class Worker extends React.Component {
    shouldComponentUpdate(next_props) {
        return this.props.worker.name !== next_props.worker.name ||
            this.props.worker.address !== next_props.worker.address ||
            this.props.worker.maximum_time !== next_props.worker.maximum_time ||
            this.props.editing !== next_props.editing
    }

    render() {
        const { worker, editing, onWorkerDelete, onWorkerChange, onWorkerChangeNoRedraw, onWorkerSaveEdit } = this.props;
        return (
            <TableRow>
                <TableCell style={styles.table_cell}>
                    {editing ?
                        <TextField style={styles.input} value={worker.name} onChange={(e) => onWorkerChange({...worker, name: e.target.value})}/> :
                        <span style={styles.span}>{worker.name}</span>
                    }
                </TableCell>
                <TableCell style={styles.table_cell}>
                    <AddressInput
                        editable={editing}
                        style={styles.input}
                        value={worker.address}
                        onChange={(e) => onWorkerChange({...worker, address: e.target.value})}
                        onLonLatChange={(e) => onWorkerChangeNoRedraw({...worker, lon: e.lon, lat: e.lat})}
                    />
                </TableCell>
                <TableCell style={styles.table_cell}>
                    {editing ?
                        <TextField
                            style={styles.input}
                            type="number"
                            value={worker.maximum_time}
                            inputProps={{min: 0,}}
                            InputProps={{startAdornment: <InputAdornment position="start">Min.</InputAdornment>,}}
                            onChange={(e) => onWorkerChange({...worker, maximum_time: e.target.value && parseInt(e.target.value)})}
                        /> :
                            <span style={styles.span}><span style={styles.span_grey}>Min.</span>&nbsp;&nbsp;{worker.maximum_time}</span>
                    }
                </TableCell>
                <TableCell style={styles.table_last_cell}>
                    <Tooltip title={editing ? 'Save' : 'Edit worker'}>
                        <IconButton onClick={onWorkerSaveEdit}>{editing ? <DoneIcon/> : <EditIcon/>}</IconButton>
                    </Tooltip>
                    <Tooltip title="Delete worker">
                        <IconButton onClick={onWorkerDelete}><DeleteIcon/></IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
        );
    }
}

class Workers extends React.Component {
    shouldComponentUpdate(next_props) {
        return this.props.workers !== next_props.workers || this.props.editing !== next_props.editing;
    }

    render() {
        const { workers, editing, onWorkerDelete, onWorkerChange, onWorkerChangeNoRedraw, onWorkerSaveEdit } = this.props;
        return (
            <Table style={styles.table}>
                <TableBody>
                    {workers.map((worker) => (
                        <Worker
                            key={worker.id}
                            worker={worker}
                            editing={editing === worker.id}
                            onWorkerDelete={() => onWorkerDelete(worker.id)}
                            onWorkerChange={(c) => onWorkerChange(worker.id, c)}
                            onWorkerChangeNoRedraw={(c) => onWorkerChangeNoRedraw(worker.id, c)}
                            onWorkerSaveEdit={() => onWorkerSaveEdit(worker.id)}
                        />
                    ))}
                </TableBody>
            </Table>
        );
    }
}

class WorkerTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workers: [],
            editable: -1,
            speed_dial_open: false,
            loading: false,
        };
        this.next_id = 0;
        this.file_input_ref = createRef();
        this.handleAddWorker = this.handleAddWorker.bind(this);
        this.handleSpeedDialOpen = this.handleSpeedDialOpen.bind(this);
        this.handleDeleteWorker = this.handleDeleteWorker.bind(this);
        this.handleUpdateWorker = this.handleUpdateWorker.bind(this);
        this.handleUpdateWorkerNoRedraw = this.handleUpdateWorkerNoRedraw.bind(this);
        this.handleEditWorker = this.handleEditWorker.bind(this);
        this.handleFileImport = this.handleFileImport.bind(this);
        this.handleFileExport = this.handleFileExport.bind(this);
        this.handleDeleteAll = this.handleDeleteAll.bind(this);
    }

    componentDidUpdate(__, prev_state) {
        if(this.props.onWorkerChange && this.state.workers !== prev_state.workers) {
            this.props.onWorkerChange(this.state.workers);
        }
    }

    handleAddWorker() {
        this.setState({
            editable: this.next_id,
            workers: [...this.state.workers, {
                id: this.next_id++,
                name: "",
                address: "",
                maximum_time: 0,
                lon: undefined,
                lat: undefined,
            }],
        });
    };

    handleSpeedDialOpen(v) {
        this.setState({
            speed_dial_open: v,
        });
    };

    handleDeleteWorker(id) {
        const index = this.state.workers.findIndex((worker) => worker.id === id);
        this.setState({
            workers: this.state.workers.slice(0, index).concat(this.state.workers.slice(index+1)),
            editable: -1,
        });
    };

    handleUpdateWorker(id, worker) {
        const index = this.state.workers.findIndex((worker) => worker.id === id);
        const c = this.state.workers.slice();
        c[index] = worker;
        this.setState({
            workers: c,
        });
    };

    handleUpdateWorkerNoRedraw(id, worker) {
        const index = this.state.workers.findIndex((worker) => worker.id === id);
        this.state.workers[index] = worker;
        if(this.props.onWorkerChange) {
            this.props.onWorkerChange(this.state.workers);
        }
    };

    handleEditWorker(id) {
        this.setState({
            editable: this.state.editable !== id ? id : -1
        });
    };

    handleFileImport() {
        this.setState({
            editable: -1,
            loading: true,
        });
        const file = this.file_input_ref.current.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            try {
                const csv = reader.result;
                this.setState({
                    workers: this.state.workers.concat(csv.split('\n').filter(csvline => csvline.split(';').length === 3).map(csvline => {
                        const fields = csvline.split(';');
                        const worker = {
                            id: this.next_id++,
                            name: fields[0],
                            address: fields[1],
                            maximum_time: parseInt(fields[2]),
                        };
                        return worker;
                    })),
                    loading: false,
                });
            } catch(e) {
                this.setState({
                    loading: false,
                });
            }
        });
        reader.readAsText(file);
    }

    handleFileExport() {
        this.setState({
            editable: -1,
        });
        const csv = this.state.workers.map(worker => (worker.name + ';' + worker.address + ';' + worker.maximum_time)).join('\n');
        const blob = new Blob([csv], {type: 'text/csv'});
        saveAs(blob, 'workers-export.csv');
    }

    handleDeleteAll() {
        this.setState({
            editable: -1,
            workers: [],
        });
    }

    render() {
        return (
            <div style={styles.root}>
                <Table style={styles.table}>
                    <TableHead style={styles.table_head}>
                        <TableRow>
                            <TableCell style={styles.table_cell}>Name</TableCell>
                            <TableCell style={styles.table_cell}>Address</TableCell>
                            <TableCell style={styles.table_cell}>Maximum time</TableCell>
                            <TableCell style={styles.table_last_cell}>
                                <input style={styles.file_input} type="file" accept="text/csv" ref={this.file_input_ref} onChange={this.handleFileImport}/>
                                <SpeedDial
                                    ariaLabel="SpeedDial"
                                    style={styles.speed_dial}
                                    icon={<SpeedDialIcon />}
                                    onClose={() => this.handleSpeedDialOpen(false)}
                                    onOpen={() => this.handleSpeedDialOpen(true)}
                                    open={this.state.speed_dial_open}
                                    direction="down"
                                    FabProps={{size: 'small', color: 'default'}}
                                >
                                    <SpeedDialAction
                                        icon={(<AddIcon/>)}
                                        tooltipTitle="Add a worker"
                                        onClick={this.handleAddWorker}
                                    />
                                    <SpeedDialAction
                                        icon={(<PublishIcon/>)}
                                        tooltipTitle="Import csv"
                                        onClick={() => {this.file_input_ref.current.click()}}
                                    />
                                    <SpeedDialAction
                                        icon={(<GetAppIcon/>)}
                                        tooltipTitle="Export csv"
                                        onClick={this.handleFileExport}
                                    />
                                    <SpeedDialAction
                                        icon={(<DeleteIcon/>)}
                                        tooltipTitle="Delete all workers"
                                        onClick={this.handleDeleteAll}
                                    />
                                </SpeedDial>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow style={styles.table_hidden}>
                            <TableCell style={styles.table_hidden} colSpan={4}>
                                <div style={styles.scrolldiv}>
                                    <Workers
                                        workers={this.state.workers}
                                        editing={this.state.editable}
                                        onWorkerChange={this.handleUpdateWorker}
                                        onWorkerChangeNoRedraw={this.handleUpdateWorkerNoRedraw}
                                        onWorkerSaveEdit={this.handleEditWorker}
                                        onWorkerDelete={this.handleDeleteWorker}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default WorkerTable;
