import React, { useRef, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styles from '../Styles/WordCard.module.css';
import GoogleIcon from '@mui/icons-material/Google';
import { IconButton, Popover } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const WordCard = ({ data, index, onDeleteWord, onUpdateWord }) => {
  const audioRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMoreActionClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleAudioPlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsAudioPlaying(true);
    }
  }
  const renderMeanings = (meanings, userMeaning = false) => {
    return (
      <div className={`${styles.meaningBox} ${userMeaning ? styles.userMeaning : ''}`}>
        {meanings?.map((meaning, meaningIndex) => (
          <div key={meaningIndex}>
            <Typography variant="subtitle2" className={styles.partOfSpeech}>
              {meaning?.partOfSpeech}
            </Typography>
            <div className={styles.wordDefinitions}>
              {meaning?.definitions?.map((definition, di) => (
                <div key={di}>
                  <Typography className={styles.wordMeaning} variant="body2">
                    {di + 1}) {definition.definition}
                  </Typography>
                  {!!definition.example && (
                    <Typography className={styles.example} variant="body2">
                      Ex:
                      <span>{definition.example}</span>
                    </Typography>
                  )}
                </div>
              ))}
              {!!meaning?.synonyms?.length && (
                <Typography className={styles.synonyms} variant="body2">
                  Synonyms:
                  <span>{meaning.synonyms.join(', ')}</span>
                </Typography>
              )}
              {!!meaning?.antonyms?.length && (
                <Typography className={styles.synonyms} variant="body2">
                  Antonyms:
                  <span >{meaning.antonyms.join(', ')}</span>
                </Typography>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" className={styles.cardContainer}>
          <div>
            {data?.phonetics?.audio &&
              <IconButton aria-label="Search on Google" size="large" color='primary' onClick={handleAudioPlay}>
                {isAudioPlaying ?
                  <VolumeUpIcon />
                  : <VolumeDownIcon />
                }
                <audio ref={audioRef} src={data?.phonetics?.audio} onEnded={() => setIsAudioPlaying(false)}></audio>
              </IconButton>
            }
            {data.name}
            <a href={`https://www.google.com/search?q=${data.name}`} target='_blank' rel='noreferrer'>
              <IconButton aria-label="Search on Google" size="large" color='primary'>
                <GoogleIcon />
              </IconButton>
            </a>
          </div>
          <IconButton onClick={handleMoreActionClick}>
            <MoreVertIcon style={{cursor: 'pointer'}} />
          </IconButton>
        </Typography>
        <div className={styles.wordMeaningsContainer}>
          {renderMeanings(data?.userMeanings, true)}
          {!!data?.meanings?.length && renderMeanings(data?.meanings)}
        </div>
      </CardContent>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClick={handleClose}
      >
        <div onClick={() => onUpdateWord(index)}><Typography sx={{ p: 2 }} style={{cursor: 'pointer'}}>Edit Meaning</Typography></div>
        <div onClick={() => onDeleteWord(index)}><Typography sx={{ p: 2 }} style={{cursor: 'pointer'}}>Delete Word</Typography></div>
      </Popover>
    </Card>
  );
}

export default WordCard