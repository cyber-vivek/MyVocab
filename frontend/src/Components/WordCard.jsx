import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styles from '../Styles/WordCard.module.css';


const WordCard = ({ data }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" component="div">
          {data.name}
        </Typography>
        <div className={styles.wordMeaningsContainer}>
        {
          data?.meanings?.map(meaning => (
            <div>
              <Typography variant='subtitle2' className={styles.partOfSpeech}>
                {meaning?.partOfSpeech}
              </Typography>
              <div className={styles.wordDefinitions}>
                {
                  meaning?.definitions?.map((definition, mi) => (
                    <div>
                      <Typography className={styles.wordMeaning} variant='body2'>
                        {mi + 1}) {definition.definition}
                      </Typography>
                      {!!definition.example &&
                        <Typography className={styles.example} variant='body2'>
                          Ex:
                          <span>{definition.example}</span>
                        </Typography>
                      }
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        }
        </div>
      </CardContent>
    </Card>
  )
}

export default WordCard