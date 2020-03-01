
import React, { useState, useMemo } from 'react';
import { makeStyles, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel } from '@material-ui/core';

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
}));

function toPaddedIntString(num) {
    const int = Math.trunc(num);
    if(num >= 10) {
        return String(int);
    } else {
        return '0' + String(int);
    }
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function ClientTable(props) {
    const classes = useStyles();
    const { plan } = props;
    const [order_by, setOrderBy] = useState('');
    const [order, setOrder] = useState('asc');

    const createSortHandler = property => () => {
        if(order_by !== property) {
            setOrderBy(property);
            setOrder('asc');
        } else {
            setOrder(order === 'asc' ? 'desc' : 'asc');
        }
    };

    const sortedPlan = useMemo(() => (
        stableSort(plan, (a, b) => {
            if(a[order_by] === b[order_by]) {
                return 0;
            } else if(a[order_by] < b[order_by]) {
                return order === 'asc' ? -1 : 1;
            } else {
                return order === 'asc' ? 1 : -1;
            }
        })
    ), [plan, order, order_by]);

    return (
        <div className={classes.root}>
            <Table className={classes.table}>
                <TableHead className={classes.table_head}>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={order_by === 'worker'}
                                direction={order_by === 'worker' ? order : 'asc'}
                                onClick={createSortHandler('worker')}
                            >
                                Worker
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={order_by === 'client'}
                                direction={order_by === 'client' ? order : 'asc'}
                                onClick={createSortHandler('client')}
                            >
                                Client
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={order_by === 'day'}
                                direction={order_by === 'day' ? order : 'asc'}
                                onClick={createSortHandler('day')}
                            >
                                Day
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={order_by === 'time_of_day'}
                                direction={order_by === 'time_of_day' ? order : 'asc'}
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
                                        {sortedPlan.map((planned_task, index) => (
                                            <TableRow key={index} className={classes.table_hidden}>
                                                <TableCell>{planned_task.worker.name}</TableCell>
                                                <TableCell>{planned_task.client.name}</TableCell>
                                                <TableCell>{'Day ' + (planned_task.day+1)}</TableCell>
                                                <TableCell>{toPaddedIntString(planned_task.time_of_day / 60) + ':' + toPaddedIntString(planned_task.time_of_day % 60)}</TableCell>
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
