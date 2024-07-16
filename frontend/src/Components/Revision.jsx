import React, { useEffect, useState } from 'react'
import styles from '../Styles/Revision.module.css';
import { getRevisionWord, markRevision } from '../services/apiServices';
import WordCard from './WordCard';

const Revision = () => {
  const [revisionWord, setRevisionWord] = useState({});
  const [isAcknowledging, setIsAcknowledging] = useState(false);
  useEffect(() => {
    fetchRevisionWord();
  }, []);

  const fetchRevisionWord = () => {
    getRevisionWord().then(res => {
      res = res.data;
      const word = res.data || [];
      setRevisionWord(word[0] || {});
    })
  }

  const onAcknowledgeClick = () => {
    setIsAcknowledging(true);
    const payload = {
      wordId: revisionWord._id
    }
    markRevision(payload).then(() => {
      setIsAcknowledging(false);
      setRevisionWord({});
      fetchRevisionWord();
    });
  }

  return (
    <div className={styles.container}>
      {!!Object.keys(revisionWord).length &&
        <div className={styles.scrollableCont}>
          <div className={styles.scrollableArea}>
            <WordCard data={revisionWord}></WordCard>
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.acknowledgeBtn}>
              {isAcknowledging ?
                <div className={styles.dotElastic}></div>
                : <div className={styles.btnText} onClick={onAcknowledgeClick}>Acknowledge</div>
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Revision