import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DialogContent } from "@mui/material";
import TextField from '@mui/material/TextField';
import styles from '../Styles/AddWord.module.css';
import Button from '@mui/material/Button';

const AddWord = ({onAddWordClick}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const handleAddWordClick = () => {
    onAddWordClick(value);
    setOpen(false);
    setValue('');
  }
  return (
    <>
    <AddCircleOutlineIcon className={styles.AddWordIcon} fontSize="large" color="primary" onClick={() => setOpen(true)} />
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle >Add New Word</DialogTitle>
        <DialogContent className={styles.dialogContent}>
        <TextField id="outlined-basic" label="Enter Word" variant="outlined" onChange={(event) => setValue(event.target.value)} value={value}/>
        <Button variant="contained" onClick={handleAddWordClick}>Add Word</Button>
        </DialogContent>
      </Dialog> 
    </>
  );
};

export default AddWord;
