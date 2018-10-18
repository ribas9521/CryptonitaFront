const INITIAL_STATE = {
    traderList: {
        traders:[]
    },
    userFollowing: false,
    userFollowingError: '',
    followingList:[],
    followingListError:'',
    userUnfollowing:false,
    userUnfollowingError: ''
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TRADERS_LIST_FETCHED':
            return { ...state, traderList: action.payload }
        case 'USER_FOLLOWING':
            return { ...state, userFollowing: action.payload }
        case 'USER_FOLLOWING_ERROR':
            return { ...state, userFollowingError: action.payload }
        case 'FOLLOWING_LIST_FETCHED':
            return { ...state, followingList: action.payload }
        case 'FOLLOWING_LIST_ERROR':
            return { ...state, followingListError: action.payload }
        case 'USER_UNFOLLOWING':
            return { ...state, userUnfollowing: action.payload }
        case 'USER_UNFOLLOWING_ERROR':
            return { ...state, userUnfollowingError: action.payload }
        default:
            return state
    }
}