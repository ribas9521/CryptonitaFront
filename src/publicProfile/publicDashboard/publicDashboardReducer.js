const INITIAL_STATE = {
    balance: 'restrict',
    portfolio: {
        isPublic: false,
        assets:[]
    },
    orderList:{
        isPublic: false,
        orderList: []
    } ,
    balanceError: null,
    performanceInfo:[
        {   
            title:'',
            pairs:[]
        }
    ],
    performanceLoading: false

}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'BALANCE_FETCHED':
            return { ...state, balance: action.payload }
        case 'BALANCE_FETCHING':
            return { ...state, balance: 'loading' }
        case 'PORTFOLIO_FETCHED':
            return { ...state, portfolio: action.payload }
        case 'PORTFOLIO_FETCHING':
            return { ...state, portfolio: 'loading' }
        case 'ORDERS_FETCHED':
            return { ...state, orderList: action.payload }
        case 'ORDERS_FETCHING':
            return { ...state, orderList: 'loading' }
        case 'BALANCE_ERROR':
            return { ...state, balanceError: action.payload }
        case 'PERFORMANCE_FETCHED':
            return { ...state, performanceInfo: action.payload }
        case 'PERFORMANCE_FETCHING':
            return { ...state, performanceLoading: action.payload }
        default:
            return state
    }
}