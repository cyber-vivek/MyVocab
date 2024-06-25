const initialState = {
  count: 0,
};

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'HIDE':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default loaderReducer;