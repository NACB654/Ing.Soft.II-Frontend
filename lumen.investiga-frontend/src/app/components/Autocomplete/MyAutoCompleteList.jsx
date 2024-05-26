import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';

export default function MyAutoCompleteList({label, placeholder, options, onChange, multiple = false}) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Autocomplete
        placeholder={placeholder}
        multiple={multiple}
        options={options}
        onChange={onChange}
        sx={{ width: "600px" }}
      />
    </FormControl>
  );
}