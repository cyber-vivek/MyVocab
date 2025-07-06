import React from 'react';
import {
  Typography,
  Container,
  Box
} from '@mui/material';
import { generateTest } from '../../services/apiServices';
import TestLoading from './TestLoading';
import styles from '../../Styles/TakeTest.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setBuildingTest, setCurrentQuestion, setTestData } from '../../actions/testActions';
import BuildTest from './BuildTest';
import QuestionRender from './QuestionRender';
import { ResultsPage } from './ResultsPage';

export default function TestPage() {
  const dispatch = useDispatch();
  const { testData, isBuildingTest, isTestCompleted } = useSelector((state) => state?.test);

  const handleBuildTest = async (questionsCount) => {
    try {
      dispatch(setBuildingTest(true));
      const response = await generateTest({ questionsCount });
      if (response.data?.data) {
        dispatch(setTestData(response.data.data));
      }
    } catch {
      dispatch(setBuildingTest(false));
    }
  };

  const renderComponents = () => {
    if (!testData && !isBuildingTest) {
      return <BuildTest onBuildTest={handleBuildTest} />;
    }
    if(isBuildingTest) {
      return <TestLoading />
    }
    if (isTestCompleted) {
      return <ResultsPage/>;
    }
    if(testData) {
      return <QuestionRender />
    }
  };

  return (
    <Container maxWidth="md" className={styles.container}>
      <Box>
        {renderComponents()}
      </Box>
    </Container>
  );
}
