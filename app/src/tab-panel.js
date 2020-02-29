
import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    extend: {
        height: '100%',
        width: '100%',
    }
});

function TabPanel(props) {
    const classes = useStyles();
    const { children, value, index, ...other } = props;

    return (
        <Typography
            className={classes.extend}
            component="div"
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {children}
        </Typography>
    );
}

export default TabPanel;

