import * as React from "react";
import Rating from "@mui/material/Rating";
import ratingAPI from "@/app/api/ratingApi";

export default function MyRating({readOnly, rating, trabajoId = 0}) {
  const [value, setValue] = React.useState(rating);
  const [thisReadOnly, setThisReadOnly] = React.useState(readOnly)

  const handleChange = async (event, newValue) => {
    setValue(newValue)
    setThisReadOnly(!thisReadOnly)

    const result = await ratingAPI.valorarTrabajo({ puntaje: newValue, trabajoId: trabajoId })
    
    if (result.data) {
      console.log("Valoracion creada")
    }
  }

  return (
    <Rating
      name="simple-controlled"
      value={value}
      precision={0.5}
      readOnly={thisReadOnly}
      onChange={handleChange}
      sx={{
        marginTop: "7px"
      }}
    />
  );
}
