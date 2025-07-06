export const setTestData = (testData) => {
    return {
        type: 'SET_TEST_DATA',
        payload: testData,
    };
}

export const setBuildingTest = (isBuilding) => {
    return {
        type: 'SET_BUILDING_TEST',
        payload: isBuilding,
    };
}

export const setCurrentQuestion = (currentQuestion) => {
    return {
        type: 'SET_CURRENT_QUESTION',
        payload: currentQuestion,
    };
}

export const completeTest = () => {
    return {
        type: 'COMPLETE_TEST',
    };
}

export const setSelectedAnswer = (answer) => {
    return {
        type: 'SET_SELECTED_ANSWER',
        payload: answer,
    };
}

export const resetTest = () => {
    return {
        type: 'RESET_TEST',
    };
}
