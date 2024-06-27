import React, { useEffect, useRef, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Autocomplete, DialogContent } from "@mui/material";
import TextField from "@mui/material/TextField";
import styles from "../Styles/AddWord.module.css";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { IconButton } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import {
  INITIAL_ADD_WORD_FORM_DATA,
  INITIAL_DEFINITION,
  INITIAL_MEANING_DATA,
  PARTS_OF_SPEECH,
} from "../constants";

const AddWord = ({ onAddWordClick }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(INITIAL_ADD_WORD_FORM_DATA)));
  const dialogContentRef = useRef(null);
  const handleAddWordClick = () => {
    onAddWordClick(formData);
    setOpen(false);
    setFormData(JSON.parse(JSON.stringify(INITIAL_ADD_WORD_FORM_DATA)));
  };
  const handleAddMoreDefinition = (meaningIndex) => {
    const meanings = formData.meanings;
    meanings[meaningIndex]?.definitions?.push(JSON.parse(JSON.stringify(INITIAL_DEFINITION)));
    setFormData({ ...formData, meanings });
  };
  const handleAddMoreMeaningClick = () => {
    const meanings = formData.meanings;
    meanings.push(JSON.parse(JSON.stringify(INITIAL_MEANING_DATA)));
    setFormData({...formData, meanings });
  }

  const handlePartOfSpeechChange = (meaningIndex, event, value = 0 ) => {
    console.log(value);
    const meanings = formData.meanings;
    meanings[meaningIndex].partOfSpeech = value || event.target.value;
    setFormData({...formData, meanings });
  }

  const handleDefinitionAndExampleChange = (event, meaningIndex, defIndex, type) => {
    const meanings = formData.meanings;
    if(type) {
      meanings[meaningIndex].definitions[defIndex].example = event.target.value;
    } else {
      meanings[meaningIndex].definitions[defIndex].definition = event.target.value;
    }
    setFormData({...formData, meanings });
  }

  // useEffect(() => {
  //   const container = dialogContentRef.current;
  //   container.scrollTop = container.scrollHeight;
  // }, [formData])
  return (
    <>
      <IconButton
        className={styles.AddWordIcon}
        onClick={() => setOpen(true)}
        aria-label="Add Word"
        size="large"
        color="primary"
      >
        <AddCircleOutlineIcon fontSize="large" />
      </IconButton>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle>Add New Word</DialogTitle>
        <DialogContent className={styles.dialogContent} ref={dialogContentRef}>
          <TextField
            label="Enter Word"
            required={true}
            variant="outlined"
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
            value={formData.name}
          />
          <div className={styles.AddWordMeaningContainer}>
            {formData.meanings.map((meaning, meaningIndex) => (
              <div className={styles.AddWordMeaning}>
                <Autocomplete
                  id="part-of-speech-dropdown"
                  freeSolo
                  options={PARTS_OF_SPEECH.map((option) => option.name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={`Part Of Speech ${meaningIndex + 1}`}
                      onChange={(event) => handlePartOfSpeechChange(meaningIndex, event)}
                      />
                      )}
                  value={meaning.partOfSpeech}
                  onChange={(event, value) => handlePartOfSpeechChange(meaningIndex, event, value)}
                />
                {meaning.definitions.map((definition, defIndex) => (
                  <div className={styles.meaningExample}>
                    <Input multiline placeholder={`Definition ${defIndex +1}`} onChange={(event) => handleDefinitionAndExampleChange(event, meaningIndex, defIndex, 0)} value={formData?.meanings?.[meaningIndex]?.definition?.[defIndex]?.definition}/>
                    <Input multiline placeholder={`Example ${defIndex + 1} (Optional)`} onChange={(event) => handleDefinitionAndExampleChange(event, meaningIndex, defIndex, 1)} value={formData?.meanings?.[meaningIndex]?.definition?.[defIndex]?.example} />
                  </div>
                ))}
                <div
                  className={styles.addMoreDefinition}
                >
                  <span className={styles.addMoreText} onClick={(event) => handleAddMoreDefinition(meaningIndex, event)}>Add More Definition</span>
                </div>
              </div>
            ))}
            <div><span onClick={handleAddMoreMeaningClick} className={styles.addMoreText}>Add More Meanings</span></div>
          </div>
        </DialogContent>
        <DialogActions className={styles.addWordDialogActions}>
          <Button variant="contained" onClick={handleAddWordClick}>
            Add Word
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddWord;
