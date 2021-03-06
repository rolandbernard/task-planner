
import React, { useState, useMemo, createRef, useEffect } from 'react';
import { makeStyles, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, Tooltip } from '@material-ui/core';

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
    table_row_high: {
        background: '#EFEFEF',
    },
}));

function toPaddedIntString(num) {
    const int = Math.trunc(num);
    if(num >= 10) {
        return String(int);
    } else {
        return '0' + String(int);
    }
}

function ClientTable(props) {
    const classes = useStyles();
    const { plan, highlightClient, onTaskHover } = props;
    const [order_by, setOrderBy] = useState([]);

    const createSortHandler = property => () => {
        if(!(order_by[0]) || order_by[0].prop !== property) {
            setOrderBy([{prop: property, order: 'asc'}, ...order_by.filter(el => el.prop !== property)]);
        } else {
            setOrderBy(order_by.map((el, index) => index === 0 ? {prop: el.prop, order: (el.order === 'asc' ? 'desc' : 'asc')} : el));
        }
    };

    const sortedPlan = useMemo(() => (
        plan.map(({worker, client, day, time_of_day}) => ({
            worker: worker,
            client: client,
            day: day,
            time_of_day: time_of_day,
            worker_name: worker.name,
            client_name: client.name,
        })).sort((a, b) => {
            for(let {prop, order} of order_by) {
                if(a[prop] < b[prop]) {
                    return order === 'asc' ? -1 : 1;
                }else if(a[prop] > b[prop]) {
                    return order === 'asc' ? 1 : -1;
                }
            }
            return 0;
        })
    ), [plan, order_by]);

    const onMouseOver = (task) => {
        if(onTaskHover) {
            onTaskHover(task);
        }
    }

    return (
        <div className={classes.root}>
            <Table className={classes.table}>
                <TableHead className={classes.table_head}>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={order_by[0] && order_by[0].prop === 'worker_name'}
                                direction={order_by[0] && order_by[0].prop === 'worker_name' ? order_by[0].order : 'asc'}
                                onClick={createSortHandler('worker_name')}
                            >
                                Worker
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={order_by[0] && order_by[0].prop === 'client_name'}
                                direction={order_by[0] && order_by[0].prop === 'client_name' ? order_by[0].order : 'asc'}
                                onClick={createSortHandler('client_name')}
                            >
                                Task
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={order_by[0] && order_by[0].prop === 'day'}
                                direction={order_by[0] && order_by[0].prop === 'day' ? order_by[0].order : 'asc'}
                                onClick={createSortHandler('day')}
                            >
                                Day
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={order_by[0] && order_by[0].prop === 'time_of_day'}
                                direction={order_by[0] && order_by[0].prop === 'time_of_day' ? order_by[0].order : 'asc'}
                                onClick={createSortHandler('time_of_day')}
                            >
                                Time
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow className={classes.table_hidden}>
                        <TableCell className={classes.table_hidden} colSpan={4}>
                            <div className={classes.scrolldiv}>
                                <Table className={classes.table}>
                                    <TableBody>
                                        {sortedPlan.map((planned_task) => (
                                            <TableRow key={JSON.stringify(planned_task)} className={planned_task.client.id === highlightClient ? classes.table_row_high : null} onMouseMove={() => onMouseOver(planned_task)} onMouseLeave={() => onMouseOver(null)}>
                                                <TableCell>
                                                    <Tooltip title={planned_task.worker.address}>
                                                        <span>{planned_task.worker.name}</span>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title={planned_task.client.address}>
                                                        <span>{planned_task.client.name}</span>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>{'Day ' + (planned_task.day+1)}</TableCell>
                                                <TableCell>
                                                    {toPaddedIntString(planned_task.time_of_day / 60) + ':' + toPaddedIntString(planned_task.time_of_day % 60)}&nbsp;-&nbsp; 
                                                    {toPaddedIntString((planned_task.time_of_day + planned_task.client.working_time) / 60) + ':' + toPaddedIntString((planned_task.time_of_day + planned_task.client.working_time) % 60)}
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
