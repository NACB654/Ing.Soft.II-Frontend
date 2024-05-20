import * as React from "react";
import Button from "@mui/joy/Button";

export default function MyButtons({label, width = "120px", variant = "solid", onClick}) {
  return (
    <Button
      sx={{
        background: variant == "solid" ? "#F37021" : "transparent",
        padding: "10px 14px",
        width: { width },
        borderRadius: "10px",
        color: variant == "solid" ? "#FFFFFF" : "#F37021",
        border: "transparent",
        "&:hover": {
          background: variant == "solid" ? "#CC4F04" : "#FFE0BB",
        }
      }}
      variant={variant}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
