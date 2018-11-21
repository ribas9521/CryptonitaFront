const INITIAL_STATE = {    
    portfolio: [],
    orderList: [{ side: '', symbol: '', lastExecutedPrice: 0 }],
    dashboardError: null,

}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {      
        case 'PORTFOLIO_FETCHED':
            return { ...state, portfolio: action.payload }
        case 'ORDERS_FETCHED':
            return { ...state, orderList: action.payload }
        case 'DASHBOARD_ERROR':
            return { ...state, dashboardError: action.payload }
        default:
            return state
    }
}