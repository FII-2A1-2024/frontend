import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BasicSelect = ({ title, values, onSelect, selectedOption }) => {
    const handleChange = (event) => {
        onSelect(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl
                fullWidth
                sx={{
                    "& .MuiInputLabel-root": { color: 'hsl(0, 100%, 17%) !important' },
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused": { borderColor: 'hsl(0, 100%, 17%) !important' }
                    },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: 'hsl(0, 100%, 17%) !important' }
                }}
            >

                <InputLabel>{title}</InputLabel>
                <Select
                    labelId={title}
                    id={title}
                    value={selectedOption}
                    label={title}
                    onChange={handleChange}
                    defaultValue={values[0]}
                >
                    {values.map((option) => (
                        <MenuItem key={option} value={option}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'hsl(0, 100%, 91%)'
                                }
                            }}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default BasicSelect;
