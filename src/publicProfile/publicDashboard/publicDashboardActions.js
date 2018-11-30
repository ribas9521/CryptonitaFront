import axios from 'axios'
import consts from '../../common/helpers/consts'
import { loadState } from "../../common/helpers/localStorage";
import { toastr } from "react-redux-toastr";

export function getBalances(userId) {
    return dispatch => {
        const identity = loadState('identity')
        if (identity && parseInt(identity.username.usernameId) === userId) {
            dispatch({ type: 'BALANCE_FETCHNG', payload: true })
            axios.get(`${consts.API_URL}/username/balances`, { headers: { session: identity.sessionId } })
                .then(resp => {
                    dispatch([{ type: 'BALANCE_FETCHED', payload: resp.data.result },
                        { type: 'BALANCE_FETCHNG', payload: false }
                    ])
                })
                .catch(e => {
                    toastr.error("Error", e.response.data.message)
                    dispatch([{ type: 'BALANCE_ERROR', payload: "Error in fetching balance"},
                        { type: 'BALANCE_FETCHNG', payload: false }])

                })
        }
        else {
            dispatch([{ type: 'BALANCE_FETCHED', payload: "restrict" }])
        }
    }
}

export function getPortfolio(userId) {
    return dispatch => {
        const identity = loadState('identity')
        dispatch({ type: 'PORTFOLIO_FETCHING', payload: true })
        axios.get(`${consts.API_URL}/username/portfolio/${userId}`,
            { headers: { session: identity ? identity.sessionId : null } })
           
            .then(resp => {
                dispatch({ type: 'PORTFOLIO_FETCHED', payload: resp.data.result })
                dispatch({ type: 'PORTFOLIO_FETCHING', payload: false })
            })
            .catch(e => {
                dispatch({ type: 'PORTFOLIO_ERROR', payload: "Error in fetching portfolio" })
                dispatch({ type: 'PORTFOLIO_FETCHING', payload: false })
            })
    }

}

export function getOrders(userId) {
    return dispatch => {
        const identity = loadState('identity') 
        dispatch({ type: 'ORDERS_FETCHING', payload: true })   
        axios.get(`${consts.API_URL}/username/exchange-orders/${userId}`, 
            { headers: { session: identity ? identity.sessionId : null } })
            .then(resp => {
                dispatch({ type: 'ORDERS_FETCHED', payload: resp.data.result })
                dispatch({ type: 'ORDERS_FETCHING', payload: false })  
            })
            .catch(e => {
                dispatch({ type: 'ORDERS_ERROR', payload: "Error in fetching orders" })
                dispatch({ type: 'ORDERS_FETCHING', payload: false })  
            })
    }
}

export function getPerformanceByPeriod(period, userId) {
    return dispatch => {
        const identity = loadState('identity')
        if(identity && !userId)
            userId = identity.username.usernameId
            
            dispatch({ type: 'PERFORMANCE_FETCHING', payload: true })
            axios.get(`${consts.API_URL}/username/performance/${period}/${userId}`)
                .then(resp => {
                    dispatch([{ type: 'PERFORMANCE_FETCHED', payload: resp.data.result },
                        dispatch({ type: 'PERFORMANCE_FETCHING', payload: false })])
                })
                .catch(e => {
                    dispatch([{ type: 'DASHBOARD_ERROR', payload: "Error in fetching performance chart" },
                        dispatch({ type: 'PERFORMANCE_FETCHING', payload: false })])
                })
        
        
    }
}