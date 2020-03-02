
import React, { useState, useEffect } from 'react';
import { TextField, Tooltip, makeStyles, InputAdornment } from '@material-ui/core';
import { green, orange } from '@material-ui/core/colors';
import ErrorIcon from '@material-ui/icons/Error';
import CheckIcon from '@material-ui/icons/Check';

import { getCoordinatedForAddress } from './nominatim';

const useStyles = makeStyles({
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
    icon_error: {
        color: orange[500],
        verticalAlign: 'middle',
    },
    icon_check: {
        color: green[500],
        verticalAlign: 'middle',
    },
});

function AddressInput(props) {
    const classes = useStyles();
    const { editable, onChange, value, ...others } = props;
    const [faulty, setFaulty] = useState(false);

    useEffect(() => {
        const timout = setTimeout(async () => {
            try {
                const [lon, lat] = await getCoordinatedForAddress(value);
                setFaulty(false);
                onChange({target: {value: value}, lon: lon, lat: lat});
            } catch(e) {
                setFaulty(true);
            }
        }, 500);
        return () => clearTimeout(timout);
    }, [value]);

    const onChangeCheck = (e) => {
        onChange(e);
    };

    return (
        <Tooltip title={faulty ? 'Address not found' : ''}>
            {editable ?
                <TextField
                    error={faulty}
                    onChange={onChangeCheck}
                    value={value}
                    InputProps={{startAdornment: 
                        <InputAdornment position="start">
                            {faulty ? <ErrorIcon className={classes.icon_error} fontSize="small"/> : <CheckIcon className={classes.icon_check} fontSize="small"/>}
                        </InputAdornment>,
                    }}
                    {...others}
                /> :
                    <span className={classes.span}>{faulty ? <ErrorIcon className={classes.icon_error} fontSize="small"/> : <CheckIcon className={classes.icon_check} fontSize="small"/>}&nbsp;&nbsp;{value}</span>}
        </Tooltip>
    );
}

export default AddressInput;

