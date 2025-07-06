const initialState = {
    testData: null,
    isBuildingTest: false,
    isTestCompleted: false,
    currentQuestion: 0,
    selectedAnswers: [],
}

export const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TEST_DATA':
            return {
                ...state,
                testData: action.payload,
                isBuildingTest: false,
                isTestCompleted: false,
                currentQuestion: 0,
                selectedAnswers: Array(action.payload.length).fill(null),
            };
        case 'SET_BUILDING_TEST':
            return {
                ...state,
                isBuildingTest: action.payload,
            };
        case 'SET_CURRENT_QUESTION':
            return {
                ...state,
                currentQuestion: action.payload,
                isTestCompleted: action.payload >= (state.testData ? state.testData.length : 0),
            };
        case 'COMPLETE_TEST':
            return {
                ...state,
                isTestCompleted: true,
            };
        case 'SET_SELECTED_ANSWER':
            const selectedAnswers = [...state.selectedAnswers];
            selectedAnswers[state.currentQuestion] = action.payload;
            return {
                ...state,
                selectedAnswers,
            };
        case 'RESET_TEST':
            return {
                ...initialState,
            };
        default:
            return state;
    }
}