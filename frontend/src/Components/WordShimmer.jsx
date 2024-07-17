import React from "react";
import styles from '../Styles/WordShimmer.module.css';

const WordShimmer = ({ count = 4 }) => {
  return (
    <div className={styles.shimmer}>
      {Array.from({ length: count }, (_, index) => (
        <div className={styles.wrapper}>
          <div className={[styles.stroke, styles.animate, styles.title].join(' ')}></div>
          <div className={[styles.stroke, styles.animate, styles.link].join(' ')}></div>
          <div className={[styles.stroke, styles.animate, styles.description].join(' ')}></div>
        </div>
      ))}
    </div>
  );
};

export default WordShimmer;
