import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {'Copyright © '}
      Vivek@MyVocab {' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>

  )
}

export default Copyright