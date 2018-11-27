import axios from 'axios'
import consts from '../../common/helpers/consts'
import { loadState } from "../../common/helpers/localStorage";
import { toastr } from "react-redux-toastr";

export function getBalances(userId) {
    return dispatch => {
        const identity = loadState('identity')
        if (identity && identity.username.usernameId === userId) {
            axios.get(`${consts.API_URL}/username/balances`, { headers: { session: identity.sessionId } })
                .then(resp => {
                    dispatch([{ type: 'BALANCE_FETCHED', payload: resp.data.result },
                    ])
                })
                .catch(e => {
                    toastr.error("Error", e.response.data.message)
                    dispatch([{ type: 'BALANCE_ERROR', payload: e.response.data.message || "Error" }])

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
        axios.get(`${consts.API_URL}/username/portfolio/${userId}`,
            { headers: { session: identity ? identity.sessionId : null } })
            .then(resp => {
                dispatch({ type: 'PORTFOLIO_FETCHED', payload: resp.data.result })
            })
            .catch(e => {
                dispatch({ type: 'PORTFOLIO_ERROR', payload: e.response.data.message || "Error" })
            })
    }

}

export function getOrders(userId) {
    return dispatch => {
        const identity = loadState('identity')    
        axios.get(`${consts.API_URL}/username/exchange-orders/${userId}`, 
            { headers: { session: identity ? identity.sessionId : null } })
            .then(resp => {
                dispatch({ type: 'ORDERS_FETCHED', payload: resp.data.result })
            })
            .catch(e => {
                dispatch({ type: 'ORDERS_ERROR', payload: e.response.data.message || "Error" })
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
                    dispatch([{ type: 'DASHBOARD_ERROR', payload: e.response.data.message || "Error" },
                        dispatch({ type: 'PERFORMANCE_FETCHING', payload: false })])
                })
        
        
    }
}