import { isEmpty } from "../common/helpers/formatValues";

const INITIAL_STATE = {
    profile:{
        usernameId: null,
        name:'',
        totalProfitBTCPercent: 0,
        lastDayProfit:0,
        isTrader: 'initial'
    },
    profileLoading: false,
    followedTrader:{
        usernameId: null,
        name:'',
        totalProfitBTCPercent: 0,
        lastDayProfit:0
    },
    followedTraderFetching:false,
    profileLoading: false,
    investorResumeFetching: false,
    investorResume:[],
    traderResume:{},
    traderResumeFetching:false

}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PUBLIC_PROFILE_FETCHED':
            return { ...state, profile: action.payload }
        case 'PUBLIC_PROFILE_FETCHING':
            return { ...state, profileLoading: action.payload }
        case 'FOLLOWED_TRADER_FETCHED':
            return { ...state, followedTrader: action.payload }
        case 'FOLLOWED_TRADER_FETCHING':
            return { ...state, followedTraderFetching: action.payload }
        case 'INVESTOR_RESUME_FETCHING':
            return { ...state, investorResumeFetching: action.payload }
        case 'INVESTOR_RESUME_FETCHED':
            return { ...state, investorResume: action.payload  }
        case 'TRADER_RESUME_FETCHED':
            return { ...state, traderResume: action.payload  }
        case 'TRADER_RESUME_FETCHING':
            return { ...state, traderResumeFetching: action.payload  }
        default:
            return state
    }
}