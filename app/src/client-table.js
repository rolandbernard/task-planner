
import React, { createRef } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Tooltip, IconButton, Select, MenuItem, TextField, InputAdornment, CircularProgress } from '@material-ui/core';
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
        background: 'white',
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
    button_progress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -28,
        marginLeft: -24,
    },
    info_text: {
        position: 'absolute',
        top: 'calc(50% + 1.75rem)',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#F0F0F0',
        fontSize: '5rem',
    },
};

class Client extends React.Component {
    shouldComponentUpdate(next_props) {
        return this.props.client.name !== next_props.client.name ||
            this.props.client.address !== next_props.client.address ||
            this.props.client.working_time !== next_props.client.working_time ||
            this.props.client.priority !== next_props.client.priority ||
            this.props.editing !== next_props.editing
    }

    render() {
        const { client, editing, onClientDelete, onClientChange, onClientChangeNoRedraw, onClientSaveEdit } = this.props;
        return (
            <TableRow>
                <TableCell style={styles.table_cell}>
                    {editing ?
                        <TextField style={styles.input} value={client.name} onChange={(e) => onClientChange({...client, name: e.target.value})}/> :
                        <span style={styles.span}>{client.name}</span>
                    }
                </TableCell>
                <TableCell style={styles.table_cell}>
                    <AddressInput
                        editable={editing}
                        style={styles.input}
                        value={client.address}
                        onChange={(e) => onClientChange({...client, address: e.target.value})}
                        onLonLatChange={(e) => onClientChangeNoRedraw({...client, lon: e.lon, lat: e.lat})}
                    />
                </TableCell>
                <TableCell style={styles.table_cell}>
                    {editing ?
                        <TextField
                            style={styles.input}
                            type="number"
                            value={client.working_time}
                            inputProps={{min: 0,}}
                            InputProps={{startAdornment: <InputAdornment position="start">Min.</InputAdornment>,}}
                            onChange={(e) => onClientChange({...client, working_time: e.target.value && parseInt(e.target.value)})}
                        /> :
                            <span style={styles.span}><span style={styles.span_grey}>Min.</span>&nbsp;&nbsp;{client.working_time}</span>
                    }
                </TableCell>
                <TableCell style={styles.table_cell}>
                    {editing ?
                        <Select style={styles.input} value={client.priority} onChange={(e) => onClientChange({...client, priority: e.target.value})}>
                            <MenuItem value={0.2}>Low</MenuItem>
                            <MenuItem value={0.5}>Medium</MenuItem>
                            <MenuItem value={1}>High</MenuItem>
                            <MenuItem value={2}>Very High</MenuItem>
                        </Select> :
                        <span style={styles.span}>{client.priority <= 0.25 ? 'Low' : client.priority <= 0.75 ? 'Medium' : client.priority <= 1.5 ? 'High' : 'Very High'}</span>
                    }
                </TableCell>
                <TableCell style={styles.table_last_cell}>
                    <Tooltip title={editing ? 'Save' : 'Edit client'}>
                        <IconButton onClick={onClientSaveEdit}>{editing ? <DoneIcon/> : <EditIcon/>}</IconButton>
                    </Tooltip>
                    <Tooltip title="Delete client">
                        <IconButton onClick={onClientDelete}><DeleteIcon/></IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
        );
    }
}

class Clients extends React.Component {
    shouldComponentUpdate(next_props) {
        return this.props.clients !== next_props.clients || this.props.editing !== next_props.editing;
    }

    render() {
        const { clients, editing, onClientDelete, onClientChange, onClientChangeNoRedraw, onClientSaveEdit } = this.props;
        return (
            <Table style={styles.table}>
                <TableBody>
                    {clients.map((client) => (
                        <Client
                            key={client.id}
                            client={client}
                            editing={editing === client.id}
                            onClientDelete={() => onClientDelete(client.id)}
                            onClientChange={(c) => onClientChange(client.id, c)}
                            onClientChangeNoRedraw={(c) => onClientChangeNoRedraw(client.id, c)}
                            onClientSaveEdit={() => onClientSaveEdit(client.id)}
                        />
                    ))}
                </TableBody>
            </Table>
        );
    }
}

class ClientTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            editable: -1,
            speed_dial_open: false,
            loading: false,
        };
        this.next_id = 0;
        this.file_input_ref = createRef();
        this.handleAddClient = this.handleAddClient.bind(this);
        this.handleSpeedDialOpen = this.handleSpeedDialOpen.bind(this);
        this.handleDeleteClient = this.handleDeleteClient.bind(this);
        this.handleUpdateClient = this.handleUpdateClient.bind(this);
        this.handleUpdateClientNoRedraw = this.handleUpdateClientNoRedraw.bind(this);
        this.handleEditClient = this.handleEditClient.bind(this);
        this.handleFileImport = this.handleFileImport.bind(this);
        this.handleFileExport = this.handleFileExport.bind(this);
        this.handleDeleteAll = this.handleDeleteAll.bind(this);
    }

    componentDidUpdate(__, prev_state) {
        if(this.props.onClientChange && this.state.clients !== prev_state.clients) {
            this.props.onClientChange(this.state.clients);
        }
    }

    handleAddClient() {
        this.setState({
            editable: this.next_id,
            clients: [...this.state.clients, {
                id: this.next_id++,
                name: "",
                address: "",
                working_time: 0,
                priority: 0.5,
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

    handleDeleteClient(id) {
        const index = this.state.clients.findIndex((client) => client.id === id);
        this.setState({
            clients: this.state.clients.slice(0, index).concat(this.state.clients.slice(index+1)),
            editable: -1,
        });
    };

    handleUpdateClient(id, client) {
        const index = this.state.clients.findIndex((client) => client.id === id);
        const c = this.state.clients.slice();
        c[index] = client;
        this.setState({
            clients: c,
        });
    };

    handleUpdateClientNoRedraw(id, client) {
        const index = this.state.clients.findIndex((client) => client.id === id);
        this.state.clients[index] = client;
        if(this.props.onClientChange) {
            this.props.onClientChange(this.state.clients);
        }
    };

    handleEditClient(id) {
        this.setState({
            editable: this.state.editable !== id ? id : -1
        });
    };

    handleFileImport() {
        this.setState({
            editable: -1,
            loading: true,
            speed_dial_open: false,
        });
        const file = this.file_input_ref.current.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            try {
                const csv = reader.result;
                this.setState({
                    clients: this.state.clients.concat(csv.split('\n').filter(csvline => csvline.split(';').length === 4).map(csvline => {
                        const fields = csvline.split(';');
                        const client = {
                            id: this.next_id++,
                            name: fields[0],
                            address: fields[1],
                            working_time: parseInt(fields[2]),
                            priority: parseFloat(fields[3]),
                        };
                        return client;
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
            speed_dial_open: false,
        });
        const csv = this.state.clients.map(client => (client.name + ';' + client.address + ';' + client.working_time + ';' + client.priority)).join('\n');
        const blob = new Blob([csv], {type: 'text/csv'});
        saveAs(blob, 'clients-export.csv');
    }

    handleDeleteAll() {
        this.setState({
            editable: -1,
            clients: [],
        });
    }

    render() {
        return (
            <div style={styles.root}>
                <div style={styles.info_text}>Clients</div>
                <Table style={styles.table}>
                    <TableHead style={styles.table_head}>
                        <TableRow>
                            <TableCell style={styles.table_cell}>Name</TableCell>
                            <TableCell style={styles.table_cell}>Address</TableCell>
                            <TableCell style={styles.table_cell}>Estimated duration</TableCell>
                            <TableCell style={styles.table_cell}>Priority</TableCell>
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
                                    FabProps={{size: 'small', color: 'default', disabled: this.state.loading}}
                                >
                                    <SpeedDialAction
                                        icon={(<AddIcon/>)}
                                        tooltipTitle="Add a client"
                                        onClick={this.handleAddClient}
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
                                        tooltipTitle="Delete all clients"
                                        onClick={this.handleDeleteAll}
                                    />
                                </SpeedDial>
                                {this.state.loading && <CircularProgress color="secondary" size={48} style={styles.button_progress} />}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow style={styles.table_hidden}>
                            <TableCell style={styles.table_hidden} colSpan={5}>
                                <div style={styles.scrolldiv}>
                                    <Clients
                                        clients={this.state.clients}
                                        editing={this.state.editable}
                                        onClientChange={this.handleUpdateClient}
                                        onClientChangeNoRedraw={this.handleUpdateClientNoRedraw}
                                        onClientSaveEdit={this.handleEditClient}
                                        onClientDelete={this.handleDeleteClient}
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

export default ClientTable;

