import * as React from "react";
import Textarea from "@mui/joy/Textarea";
import FormLabel from "@mui/joy/FormLabel";
import FormControl from "@mui/joy/FormControl";

export default function MyTextArea({label, placeholder, name, onChange }) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Textarea
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        minRows={2}
        maxRows={8}
        sx={{
          width: "600px",
          height: "120px",
        }}
      />
    </FormControl>
  );
}
