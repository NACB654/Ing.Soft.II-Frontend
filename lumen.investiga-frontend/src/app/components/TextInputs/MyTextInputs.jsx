import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";

export default function MyTextInput({ label, placeholder, name, type = null, width = "320px", onChange, value}) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input
        name={name}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        sx={{
          width: { width },
        }}
      />
    </FormControl>
  );
}
