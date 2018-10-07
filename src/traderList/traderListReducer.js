const INITIAL_STATE = {
    traderList: []
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TRADERS_LIST_FETCHED':
            return { ...state, traderList: action.payload }
        default:
            return state
    }
}