import React from 'react';
import { FormControlLabel, Typography, Radio } from '@mui/material';
import styles from '../../Styles/questionRender.module.css';

export const QuestionOption = ({ question, selectedIndex, handleOptionSelect = () => { } }) => {
    return question.options.map((option, idx) => {
        const isCorrect = idx === question.correctIndex;
        let classList = styles.option;
        if (selectedIndex !== null && selectedIndex === idx) {
            classList = (isCorrect) ? styles.correct : styles.wrong;
        }
        return (
            <FormControlLabel
                key={idx}
                value={option}
                className={styles.option}
                control={<Radio />}
                label={<Typography className={classList}>{option}</Typography>}
                checked={selectedIndex === idx}
                disabled={selectedIndex !== null}
                onClick={() => !(selectedIndex !== null) && handleOptionSelect(idx)}
            />
        );
    })
}