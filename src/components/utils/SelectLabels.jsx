import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectLabels = ({ valueList, value, setValue }) => {
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <FormControl >
            <Select
                value={value}
                onChange={handleChange}
                autoWidth={false}
            >
                {valueList.map((item, index) => (
                    <MenuItem key={index} value={item}>
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};


export default SelectLabels;