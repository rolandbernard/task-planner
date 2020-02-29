
import React, { useState, useEffect } from 'react';
import { TextField, Tooltip } from '@material-ui/core';

import { getCoordinatedForAddress } from './nominatim';

function AddressInput(props) {
    const { onChange, value, ...others } = props;
    const [faulty, setFaulty] = useState(false);

    const onBlur = async (e) => {
        const address = e.target.value;
        try {
            [e.lon, e.lat] = await getCoordinatedForAddress(address);
            setFaulty(false);
            onChange(e);
        } catch(e) {
            setFaulty(true);
        }
    };

    useEffect(() => {
        onBlur({target: {value: value, },});
    }, []);

    const onChangeCheck = (e) => {
        onChange(e);
    };

    return (
        <Tooltip title={faulty ? 'Address not found' : ''}>
            <TextField error={faulty} onChange={onChangeCheck} value={value} inputProps={{ onBlur: onBlur }} {...others}/>
        </Tooltip>
    );
}

export default AddressInput;

