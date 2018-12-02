const INITIAL_STATE = {
    profile:{
        usernameId: null,
        name:'',
        totalProfit: 0,
        lastDayProfit:0
    },
    profileLoading: false

}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PUBLIC_PROFILE_FETCHED':
            return { ...state, profile: action.payload }
        case 'PUBLIC_PROFILE_FETCHING':
            return { ...state, profileLoading: action.payload }
        default:
            return state
    }
}