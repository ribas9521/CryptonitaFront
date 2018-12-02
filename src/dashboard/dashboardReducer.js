const INITIAL_STATE = {
    balance: {
        balanceEvolution: [],
        totalAmountBTC: 0,
        totalAvailableBTC: 0,
        totalAlocatedBTC: 0,
        totalReturnBTC: 0
    },
    portfolio:{},
    orderList: [{ side: '', symbol: '', lastExecutedPrice: 0}],
    balanceError: null,
    
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'BALANCE_FETCHED':
            return { ...state, balance: action.payload }
        case 'PORTFOLIO_FETCHED':
            return { ...state, portfolio: action.payload }
        case 'ORDERS_FETCHED':
            return { ...state, orderList: action.payload }
        case 'BALANCE_ERROR':
            return { ...state, balanceError: action.payload }
        default:
            return state
    }
}