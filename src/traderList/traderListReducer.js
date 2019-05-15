const INITIAL_STATE = {
    traderList: {
        traders:[]
    },
    investorList:{
        investors:[]
    },
    userFollowing: 'initial',
    followingListError:'',
 
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TRADERS_LIST_FETCHED':
            return { ...state, traderList: action.payload }
        case 'INVESTORS_LIST_FETCHED':
            return { ...state, investorList: action.payload }
        case 'USER_FOLLOWING':
            return { ...state, userFollowing: action.payload }
        default:
            return state
    }
}