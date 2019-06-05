const INITIAL_STATE = {
    traderList: {
        traders:[]
    },
    investorList:{
        investors:[]
    },
    userFollowing: 'initial',
    followingListError:'',
    traderListFetching:false,
    userFollowingError:false
 
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TRADERS_LIST_FETCHED':
            return { ...state, traderList: action.payload }
        case 'TRADERS_LIST_FETCHING':
            return { ...state, traderListFetching: action.payload }
        case 'INVESTORS_LIST_FETCHED':
            return { ...state, investorList: action.payload }
        case 'USER_FOLLOWING':
            return { ...state, userFollowing: action.payload }
        case 'USER_FOLLOWING_ERROR':
            return { ...state, userFollowingError: action.payload }
        default:
            return state
    }
}