import { useState } from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import IconButton from '@mui/joy/IconButton';
import { Typography } from '@mui/joy';
import usuarioAPI from '@/app/api/usuarioApi';

export default function MyBookmarkButton({userId, trabajoId, isMarked}) {
  const [marked, setMarked] = useState(isMarked)

  const handleClick = async () => {
    if (!marked) {
      const data = {
        trabajoId: trabajoId,
        userId: userId
      }
  
      const result = await usuarioAPI.guardarTrabajo(data)
  
      if (result.data) {
        alert("Se guardó el trabajo en tu perfil")
        setMarked(!marked)
      }
    }
    else {
      //Logica para eliminar el trabajo
    }
  }

  return (
    <IconButton onClick={handleClick}>
      {marked ? <BookmarkIcon sx={{ color: "#F37021" }} /> : <BookmarkBorderIcon sx={{ color: "#F37021" }} />}
      <Typography sx={{marginLeft: "5px"}}>Guardar trabajo</Typography>
    </IconButton>
  )
}