const INITIAL_STATE = {
    balance: 'restrict',
    balanceFetching: false,
    portfolio: {
        isPublic: false,
        assets:[]
    },
    orderList:{
        isPublic: false,
        orderList: []
    } ,
    ordersFetching:false,
    balanceError: null,
    performanceInfo:[
        {   
            title:'',
            pairs:[]
        }
    ],
    performanceFetching: false,
    portfolioFetching: false

}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'BALANCE_FETCHED':
            return { ...state, balance: action.payload }
        case 'BALANCE_FETCHING':
            return { ...state, balanceFetching: action.payload }
        case 'PORTFOLIO_FETCHED':
            return { ...state, portfolio: action.payload }
        case 'PORTFOLIO_FETCHING':
            return { ...state, portfolioFetching: action.payload }
        case 'ORDERS_FETCHED':
            return { ...state, orderList: action.payload }
        case 'ORDERS_FETCHING':
            return { ...state, ordersFetching: action.payload }
        case 'BALANCE_ERROR':
            return { ...state, balanceError: action.payload }
        case 'PERFORMANCE_FETCHED':
            return { ...state, performanceInfo: action.payload !== []? action.payload : INITIAL_STATE.performanceInfo }
        case 'PERFORMANCE_FETCHING':
            return { ...state, performanceFetching: action.payload }
        default:
            return state
    }
}