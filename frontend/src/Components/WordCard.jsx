import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styles from '../Styles/WordCard.module.css';
import GoogleIcon from '@mui/icons-material/Google';
import { IconButton } from '@mui/material';


const WordCard = ({ data }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {data.name}
          <a href={`https://www.google.com/search?q=${data.name}`} target='_blank' rel='noreferrer'>
          <IconButton aria-label="Search on Google" size="large" color='primary'>
            <GoogleIcon />
          </IconButton>
          </a>
        </Typography>
        <div className={styles.wordMeaningsContainer}>
          {data?.meanings?.map((meaning) => (
            <div>
              <Typography variant="subtitle2" className={styles.partOfSpeech}>
                {meaning?.partOfSpeech}
              </Typography>
              <div className={styles.wordDefinitions}>
                {meaning?.definitions?.map((definition, mi) => (
                  <div>
                    <Typography className={styles.wordMeaning} variant="body2">
                      {mi + 1}) {definition.definition}
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