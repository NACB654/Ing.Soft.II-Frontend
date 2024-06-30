import { useState } from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import IconButton from '@mui/joy/IconButton';

export default function MyBookmarkButton() {
  const [marked, setMarked] = useState(false)

  return (
    <IconButton onClick={() => setMarked(!marked)}>
      {marked ? <BookmarkIcon/> : <BookmarkBorderIcon/>}
    </IconButton>
  )
}