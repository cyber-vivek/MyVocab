import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Container,
  Box
} from '@mui/material';
import { generateTest } from '../../services/apiServices';
import TestLoading from './TestLoading';
import styles from '../../Styles/TakeTest.module.css';
import { useRef } from 'react';

export default function TestPage() {
  const [testData, setTestData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const audioRef = useRef(new Audio('/assets/incorrect-answer.mp3')); // Path to your audio file

  const handleBuildTest = async () => {
    setIsLoading(true);
    try {
      const response = await generateTest();
      if (response.data?.data) {
        setTestData(response.data.data);
        setLoaded(true);
        setCurrentQuestion(0);
        setSelectedIndex(null);
        setShowAnswer(false);
      }
        setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch test:', error);
    }
  };

  const handleOptionSelect = (index) => {
    setSelectedIndex(index);
    setShowAnswer(true);
    const isCorrect = index === testData[currentQuestion].correctIndex;
    const audio = new Audio(isCorrect ? '/assets/correct-answer.mp3' : '/assets/incorrect-answer.mp3');
    audio.play();
  };

  const handleNext = () => {
    if (currentQuestion + 1 < testData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedIndex(null);
      setShowAnswer(false);
    } else {
      alert('🎉 Test Completed!');
      setLoaded(false);
    }
  };

  const current = testData[currentQuestion];

  return (
    <Container maxWidth="md" className={styles.container}>
      <Box sx={{ my: 4 }}>
        <Button variant="contained" color="primary" onClick={handleBuildTest}>
          Build Test
        </Button>
        <TestLoading open={isLoading} />

        {loaded && (
          <Box mt={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Q{currentQuestion + 1}. {current.question}
                </Typography>
                <RadioGroup>
                  {current.options.map((option, idx) => {
                    const isCorrect = idx === current.correctIndex;
                    const isSelected = idx === selectedIndex;

                    let color = 'inherit';
                    if (showAnswer && isSelected && isCorrect) color = 'green';
                    else if (showAnswer && isSelected && !isCorrect) color = 'red';
                    else if (showAnswer && isCorrect) color = 'green';

                    return (
                      <FormControlLabel
                        key={idx}
                        value={option}
                        control={<Radio />}
                        label={
                          <Typography sx={{ color, fontWeight: isCorrect && showAnswer ? 'bold' : 'normal' }}>
                            {option}
                          </Typography>
                        }
                        checked={selectedIndex === idx}
                        disabled={showAnswer}
                        onClick={() => !showAnswer && handleOptionSelect(idx)}
                      />
                    );
                  })}
                </RadioGroup>

                {showAnswer && (
                  <Box mt={2}>
                    <Typography variant="subtitle1">
                      {selectedIndex === current.correctIndex ? '✅ Correct!' : '❌ Wrong Answer'}
                    </Typography>
                    <Button variant="contained" sx={{ mt: 1 }} onClick={handleNext}>
                      {currentQuestion + 1 < testData.length ? 'Next' : 'Finish'}
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
    </Container>
  );
}
