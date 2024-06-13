import * as React from "react";
import Rating from "@mui/material/Rating";

export default function MyRating({readOnly}) {
  const [value, setValue] = React.useState(2);

  return (
    <Rating
      name="simple-controlled"
      value={value}
      precision={0.5}
      readOnly={readOnly}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    />
  );
}
