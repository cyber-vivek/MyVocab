import React, { useState } from 'react';
import styles from '../../Styles/buildTest.module.css';
import { Button, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import { TEST_QUESTION_NUMBERS } from '../../constants';

const BuildTest = ({ onBuildTest }) => {
  const [questionsCount, setQuestionsCount] = useState(TEST_QUESTION_NUMBERS[2].value);

  return (
    <div className={styles.wrapper}>
      <div className={styles.paper}>
        <Typography variant="h5" gutterBottom>
          Build a Test from Your Vocabulary
        </Typography>
        <div>
          <Typography variant="body1" gutterBottom sx={{ marginBottom: '20px' }}>
            Select the number of questions you want in your test:
          </Typography>
          <FormControl fullWidth size='small'>
            <InputLabel id="dropdown-label">Select</InputLabel>
            <Select
              labelId="dropdown-label"
              value={questionsCount}
              label="Select"
              onChange={(event) => setQuestionsCount(event.target.value)}
            >
              {TEST_QUESTION_NUMBERS.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Button
          variant="contained"
          size="large"
          startIcon={<BuildIcon />}
          className={styles.button}
          onClick={() => onBuildTest(questionsCount)}
        >
          Build Test
        </Button>
      </div>
    </div>
  );
};

export default BuildTest;
