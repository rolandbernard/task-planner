
import React, { useState } from 'react';
import { TextField, Tooltip } from '@material-ui/core';

import { getCoordinatedForAddress } from './nominatim';

function AddressInput(props) {
    const { onChange, value, ...others } = props;
    const [faulty, setFaulty] = useState(false);
    const [first, setFirst] = useState(true);
    let lon = undefined;
    let lat = undefined;

    if(first) {
        (async () => {
            try {
                [lon, lat] = await getCoordinatedForAddress(value);
                setFaulty(false);
            } catch(e) {
                setFaulty(true);
            }
        })();
        setFirst(false);
    }

    const onBlur = async (e) => {
        const address = e.target.value;
        try {
            [lon, lat] = await getCoordinatedForAddress(address);
            setFaulty(false);
        } catch(e) {
            setFaulty(true);
        }
    };

    const onChangeCheck = (e) => {
        e.lon = lon;
        e.lat = lat;
        onChange(e);
    };

    return (
        <Tooltip title={faulty ? 'Address not found' : ''}>
            <TextField error={faulty} onChange={onChangeCheck} value={value} inputProps={{ onBlur: onBlur }} {...others}/>
        </Tooltip>
    );
}

export default AddressInput;

