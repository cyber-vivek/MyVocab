import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  Chip,
  Stack,
  Button
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { green, red } from '@mui/material/colors';
import styles from '../../Styles/ResultsPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { QuestionOption } from './QuestionOption';
import { resetTest } from '../../actions/testActions';

export const ResultsPage = () => {
  const dispatch = useDispatch();
  const { testData, selectedAnswers } = useSelector((state) => state?.test);
  const score = testData.reduce((acc, q, index) => {
    return acc + (q.correctIndex === selectedAnswers[index] ? 1 : 0);
  }, 0);
  return (
    <Box className={styles.container}>
      <Paper elevation={3} className={styles.scoreCard}>
        <Typography variant="h4" gutterBottom>
          Test Results
        </Typography>
        <Chip
          label={`Score: ${score} / ${testData.length}`}
          color="primary"
          className={styles.scoreChip}
        />
      </Paper>

      <List>
        {testData.map((q, index) => {
          const isCorrect = q.correctIndex === selectedAnswers[index];

          return (
            <>
              <Paper elevation={2} className={styles.questionCard} key={q.id}>
                <ListItem className={styles.questionItem}>
                  <Stack direction="row" alignItems="center" spacing={1} className={styles.questionHeader}>
                    <Typography variant="h6" className={styles.questionText}>
                      Q{index + 1}: {q.question}
                    </Typography>
                    {isCorrect ? (
                      <CheckCircleIcon sx={{ color: green[500] }} />
                    ) : (
                      <CancelIcon sx={{ color: red[500] }} />
                    )}
                  </Stack>

                  <Box className={styles.optionsContainer}>
                    <QuestionOption question={q} selectedIndex={selectedAnswers[index]} isResultPage={true} />
                  </Box>
                </ListItem>
              </Paper>
            </>
          );
        })}
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(resetTest())}
      >
        Build New Test
      </Button>
    </Box>
  );
}