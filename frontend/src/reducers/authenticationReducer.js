const checkUserAuthenticated = () => {
    return !!(localStorage.getItem('authToken') && localStorage.getItem('userData'));
}
const initialState = {
    isUserAuthenticated: checkUserAuthenticated(),
    authToken: localStorage.getItem('authToken'),
    userData: JSON.parse(localStorage.getItem('userData') || '{}'),
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN':
            const {authToken, userData} = action.payload;
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('userData', JSON.stringify(userData));
            return {...state, isUserAuthenticated: true, authToken, userData};
        case 'LOGOUT':
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            return {isUserAuthenticated: false, authToken: '', userData: {}}
        default:
            return state
    }
}

export default authReducer;