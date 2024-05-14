import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const MultipleSelect = ({ title, values, onSelect, selectedOptions }) => {
  const [activeOptions, setActiveOptions] = React.useState(selectedOptions);

  const handleChange = (event) => {
    onSelect(event.target.value);
    const {
      target: { value },
    } = event;
    setActiveOptions(
      // On autofill we get a stringified value
      typeof value === 'string' ? value.split(',') : value || [],
    );
  };

  return (
    <div style={{ width: '100%' }}>
      <FormControl sx={{
        m: 1,
        minWidth: '10vw',
        "& .MuiInputLabel-root": { color: 'hsl(0, 100%, 17%) !important' },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused": { borderColor: 'hsl(0, 100%, 17%) !important' }
        },
        "& .MuiOutlinedInput-notchedOutline": { borderColor: 'hsl(0, 100%, 17%) !important' }
      }}>
        <InputLabel id="demo-multiple-name-label">{title}</InputLabel>
        <Select
          labelId={title}
          id={title}
          multiple
          value={activeOptions}
          onChange={handleChange}
          input={<OutlinedInput label={title} />}
          MenuProps={MenuProps}
        >
          {values.map((option) => (
            <MenuItem
              key={option}
              value={option}
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
    </div>
  );
}

export default MultipleSelect;
