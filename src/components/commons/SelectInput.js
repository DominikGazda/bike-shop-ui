
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const SelectInput = React.forwardRef((props, ref) => {

    const [item, setItem] = React.useState('');

    const handleChange = (event) => {
        setItem(event.target.value);
    };

    const items = [...props.items];
    const itemDescription = props.description;

    return (
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">{itemDescription}</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={item}
          onChange={handleChange}
          label="Item"
          ref={ref}
        >
        {items?.map(item => (
            <MenuItem value={item}>{!!item.name? item.name : item}</MenuItem>
        ))}
        </Select>
      </FormControl>
    )
})
export default SelectInput;