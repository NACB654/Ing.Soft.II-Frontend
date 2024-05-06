import * as React from "react";
import Button from "@mui/joy/Button";

export default function MyButtons({label, width = "120px", variant = "solid"}) {
  return (
    <Button
      sx={{
        background: variant == "solid" ? "#F37021" : "transparent",
        padding: "10px 14px",
        width: { width },
        borderRadius: "10px",
        color: variant == "solid" ? "#FFFFFF" : "#F37021",
        border: variant == "outlined" ? "1px solid #F37021" : "transparent",
        "&:hover": {
          background: variant == "solid" ? "#CC4F04" : "#FFE0BB",
        }
      }}
      variant={variant}
    >
      {label}
    </Button>
  );
}
