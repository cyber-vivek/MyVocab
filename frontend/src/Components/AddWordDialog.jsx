import React, { useEffect, useState } from 'react';
import DialogActions from "@mui/material/DialogActions";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import {
  INITIAL_ADD_WORD_FORM_DATA,
  INITIAL_DEFINITION,
  INITIAL_MEANING_DATA,
  PARTS_OF_SPEECH,
} from "../constants";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { Autocomplete, DialogContent } from "@mui/material";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { IconButton } from "@mui/material";
import styles from '../Styles/AddWordDialog.module.css';

const AddWordDialog = (props) => {
  const {handleClose, isOpen, onAddWordClick, updateWordData} = props;
  const [formData, setFormData] = useState(
    JSON.parse(JSON.stringify(INITIAL_ADD_WORD_FORM_DATA))
  );

  useEffect(()=> {
    if(updateWordData) {
      const newFd = updateWordData;
      if(!newFd?.meanings?.length) {
        newFd.meanings = [JSON.parse(JSON.stringify(INITIAL_MEANING_DATA))];
      }
      setFormData(newFd);
    } else {
      setFormData(JSON.parse(JSON.stringify(INITIAL_ADD_WORD_FORM_DATA)));
    }
  },[updateWordData])

  const handleAddWordClick = () => {
    let currFormData = formData;
    currFormData.meanings = currFormData?.meanings?.filter((meaning) => {
      meaning.definitions = meaning?.definitions?.filter((def) => {
        return def.definition?.length;
      });
      if (meaning?.partOfSpeech?.length && meaning?.definitions?.length)
        return true;
      return false;
    });
    onAddWordClick(formData);
    handleClose();
    setFormData(JSON.parse(JSON.stringify(INITIAL_ADD_WORD_FORM_DATA)));
  };
  const handleAddMoreDefinition = (meaningIndex) => {
    const meanings = formData.meanings;
    meanings[meaningIndex]?.definitions?.push(
      JSON.parse(JSON.stringify(INITIAL_DEFINITION))
    );
    setFormData({ ...formData, meanings });
  };
  const handleAddMoreMeaningClick = () => {
    const meanings = formData.meanings;
    meanings.push(JSON.parse(JSON.stringify(INITIAL_MEANING_DATA)));
    setFormData({ ...formData, meanings });
  };

  const handlePartOfSpeechChange = (meaningIndex, event, value = 0) => {
    const meanings = formData.meanings;
    meanings[meaningIndex].partOfSpeech = value || event.target.value;
    setFormData({ ...formData, meanings });
  };

  const handleDefinitionAndExampleChange = (
    event,
    meaningIndex,
    defIndex,
    type
  ) => {
    const meanings = formData.meanings;
    if (type) {
      meanings[meaningIndex].definitions[defIndex].example = event.target.value;
    } else {
      meanings[meaningIndex].definitions[defIndex].definition =
        event.target.value;
    }
    setFormData({ ...formData, meanings });
  };

  const handleMeaningDelete = (meaningIndex) => {
    const meanings = formData.meanings;
    meanings.splice(meaningIndex, 1);
    setFormData({ ...formData, meanings });
  };

  const handleDefinitionDelete = (meaningIndex, defIndex) => {
    const meanings = formData.meanings;
    meanings[meaningIndex].definitions.splice(defIndex, 1);
    setFormData({ ...formData, meanings });
  }

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <DialogTitle>{updateWordData ? 'Update' : 'Add New'} Word</DialogTitle>
      <DialogContent className={styles.dialogContent}>
        <TextField
          label="Enter Word"
          required={true}
          variant="outlined"
          disabled={!!updateWordData}
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
          }
          value={formData.name}
        />
        <div className={styles.AddWordMeaningContainer}>
          {formData.meanings.map((meaning, meaningIndex) => (
            <div key={meaningIndex} className={styles.AddWordMeaning}>
              <Autocomplete
                id="part-of-speech-dropdown"
                freeSolo
                options={PARTS_OF_SPEECH.map((option) => option.name)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={`Part Of Speech ${meaningIndex + 1}`}
                    onChange={(event) =>
                      handlePartOfSpeechChange(meaningIndex, event)
                    }
                  />
                )}
                value={meaning.partOfSpeech}
                onChange={(event, value) =>
                  handlePartOfSpeechChange(meaningIndex, event, value)
                }
              />
              {meaning.definitions.map((definition, defIndex) => (
                <div key={defIndex} className={styles.meaningExample}>
                  <Input
                    multiline
                    placeholder={`Definition ${defIndex + 1}`}
                    onChange={(event) =>
                      handleDefinitionAndExampleChange(
                        event,
                        meaningIndex,
                        defIndex,
                        0
                      )
                    }
                    value={definition?.definition}
                  />
                  <Input
                    multiline
                    placeholder={`Example ${defIndex + 1} (Optional)`}
                    onChange={(event) =>
                      handleDefinitionAndExampleChange(
                        event,
                        meaningIndex,
                        defIndex,
                        1
                      )
                    }
                    value={definition?.example}
                  />
                  {!!defIndex && (
                    <IconButton className={styles.crossIcon} onClick={() => handleDefinitionDelete(meaningIndex, defIndex)}>
                      <CancelTwoToneIcon fontSize="small" />
                    </IconButton>
                  )}
                </div>
              ))}
              <div className={styles.addMoreDefinition}>
                <span
                  className={styles.addMoreText}
                  onClick={(event) =>
                    handleAddMoreDefinition(meaningIndex, event)
                  }
                >
                  Add More Definition
                </span>
              </div>
              {!!meaningIndex && (
                <IconButton className={styles.crossIcon} onClick={() => handleMeaningDelete(meaningIndex)}>
                  <CancelTwoToneIcon
                    fontSize="small"
                  />
                </IconButton>
              )}
            </div>
          ))}
          <div>
            <span
              onClick={handleAddMoreMeaningClick}
              className={styles.addMoreText}
            >
              Add More Meanings
            </span>
          </div>
        </div>
      </DialogContent>
      <DialogActions className={styles.addWordDialogActions}>
        <Button variant="contained" onClick={handleAddWordClick}>
          {updateWordData ? 'Update' : 'Add'} Word
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddWordDialog