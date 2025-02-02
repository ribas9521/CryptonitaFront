const INITIAL_STATE = {
    userCreated: false,
    emailVerified: false,
    userAuthenticated: 'initial',
    passwordChanged: false,
    forgotSent: false,
    identity: null,
    authError: null,    
    resetDone: false,
    isFirstTime:false,
    authLoading: false,
    registerLoading: false
    
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USER_CREATED':
            return { ...state, userCreated: action.payload }
        case 'EMAIL_VERIFIED':
            return { ...state, emailVerified: action.payload }
        case 'USER_AUTHENTICATED':
            return { ...state, userAuthenticated: action.payload }
        case 'USER_IDENTITY_FETCHED':
            return { ...state, identity: action.payload }
        case 'AUTH_ERROR':
            return { ...state, authError: action.payload}
        case 'FORGOT_PASSWORD_SENT':
            return { ...state, forgotSent: action.payload}
        case 'RESET_PASSWORD_DONE':
            return { ...state, resetDone: action.payload}
        case 'PASSWORD_CHANGED':
            return { ...state, passwordChanged: action.payload}
        case 'IS_FIRST_TIME':
            return { ...state, isFirstTime: action.payload}
        case 'USER_AUTHENTICATION_LOADING':
            return { ...state, authLoading: action.payload}
        case 'USER_REGISTER_LOADING':
            return { ...state, registerLoading: action.payload}
        default:
            return state
    }
}