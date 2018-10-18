const INITIAL_STATE = {
    profile: {
        bigDesc: '',
        smallDesc:''
    },
    apiKeyList:{
        name:'',
        active: false
    },
    apiKeyDeleted:false,
    apiKeyRegistered:false,
    apiKeyError: ''
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PROFILE_FETCHED':
            return { ...state, profile: action.payload }
        case 'PROFILE_ERROR':
            return { ...state, profile: action.payload }
        case 'API_KEY_REGISTERED':
            return { ...state, apiKeyRegistered: action.payload }
        case 'API_KEY_ERROR':
            return { ...state, apiKeyError: action.payload }
        case 'API_KEY_FETCHED':
            return { ...state, apiKeyList: action.payload }
        case 'API_KEY_DELETED':
            return { ...state, apiKeyDeleted: action.payload }
        default:
            return state
    }
}