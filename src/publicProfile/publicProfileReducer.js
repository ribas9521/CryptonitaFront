const INITIAL_STATE = {
    profile:{
        usernameId: null,
        name:'',
        totalProfitBTCPercent: 0,
        lastDayProfit:0
    },
    profileLoading: false,
    investorResumeFetching: false,
    investorResume:[]

}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PUBLIC_PROFILE_FETCHED':
            return { ...state, profile: action.payload }
        case 'PUBLIC_PROFILE_FETCHING':
            return { ...state, profileLoading: action.payload }
        case 'INVESTOR_RESUME_FETCHING':
            return { ...state, investorResumeFetching: action.payload }
        case 'INVESTOR_RESUME_FETCHED':
            return { ...state, investorResume: action.payload }
        default:
            return state
    }
}