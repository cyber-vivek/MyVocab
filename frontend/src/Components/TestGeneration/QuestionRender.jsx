import React, { useState } from 'react';
import styles from '../../Styles/questionRender.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Card,
    CardContent,
    Typography,
    RadioGroup,
    Box
} from '@mui/material';
import { setCurrentQuestion, setSelectedAnswer } from '../../actions/testActions';
import { QuestionOption } from './QuestionOption';

const QuestionRender = () => {
    const dispatch = useDispatch();
    const { testData, currentQuestion } = useSelector((state) => state.test);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const current = testData[currentQuestion];

    const handleNext = () => {
        dispatch(setSelectedAnswer(selectedIndex));
        dispatch(setCurrentQuestion(currentQuestion + 1));
        setSelectedIndex(null);
    }

    const handleOptionSelect = (index) => {
        setSelectedIndex(index);
        const isCorrect = index === current.correctIndex;
        const audio = new Audio(isCorrect ? '/assets/correct-answer.mp3' : '/assets/incorrect-answer.mp3');
        audio.play();
    };

    return (
        <Box>
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Q{currentQuestion + 1}. {current.question}
                    </Typography>
                    <RadioGroup>
                        <QuestionOption question={current} selectedIndex={selectedIndex} handleOptionSelect={handleOptionSelect} />
                    </RadioGroup>

                    {(selectedIndex !== null) && (
                        <Box className={styles.feedback}>
                            <Typography variant="subtitle1">
                                {selectedIndex === current.correctIndex ? '✅ Correct!' : '❌ Wrong Answer'}
                            </Typography>
                            <Button variant="contained" className={styles.button} onClick={handleNext}>
                                {currentQuestion + 1 < testData.length ? 'Next' : 'Finish'}
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    )
}

export default QuestionRender;