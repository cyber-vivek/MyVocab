import React, { useRef, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styles from '../Styles/WordCard.module.css';
import GoogleIcon from '@mui/icons-material/Google';
import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';


const WordCard = ({ data }) => {
  const audioRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const handleAudioPlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsAudioPlaying(true);
    }
  }
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
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
        </Typography>
        <div className={styles.wordMeaningsContainer}>
          {data?.meanings?.map((meaning, meaningIndex) => (
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
      </CardContent>
    </Card>
  );
}

export default WordCard