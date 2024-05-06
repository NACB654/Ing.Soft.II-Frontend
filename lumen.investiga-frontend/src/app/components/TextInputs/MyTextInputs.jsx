import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";

export default function MyTextInput({ label, placeholder, width = "320px" }) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input
        placeholder={placeholder}
        sx={{
          width: { width },
        }}
      />
    </FormControl>
  );
}
