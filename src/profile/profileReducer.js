const INITIAL_STATE = {
    profile: {
        bigDesc: '',
        smallDesc:''
    }
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PROFILE_FETCHED':
            return { ...state, profile: action.payload }
        case 'API_KEY_REGISTERED':
            return { ...state, apiKeyRegistered: action.payload }
        case 'API_KEY_ERROR':
            return { ...state, apiKeyError: action.payload }
        default:
            return state
    }
}