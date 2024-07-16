import React from "react";
import styles from '../Styles/About.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <h1>About</h1>
      <p>
        This platform allows users to add words and explore their meanings.
        Additionally, it provides functionality to search for the meanings of
        words on Google directly from this site. The goal is to offer a
        convenient and user-friendly tool for enhancing vocabulary and
        understanding of language.
      </p>
      <p>
        Whether for students, writers, or anyone with a love for words, this
        website is designed to facilitate learning and discovery of new meanings
        in a simple and effective manner. Thank you for visiting and enjoy
        exploring!
      </p>
    </div>
  );
};

export default About;
