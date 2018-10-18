import axios from 'axios'
import consts from '../common/helpers/consts'
import { loadState, saveState, removeState } from "../common/helpers/localStorage";
import { toastr } from "react-redux-toastr";

export function getDashboard() {
    return dispatch => {
        const identity = loadState('identity')
        if (identity) {
            axios.get(`${consts.API_URL}/username/balances`, { headers: { session: identity.sessionId } })
                .then(resp => {
                    dispatch([{ type: 'DASHBOARD_FETCHED', payload: resp.data.result }, 
                        getPortfolio(),
                        getOrders()])
                })
                .catch(e => {
                    toastr.error("Error", e.response.data.message)
                    dispatch([{ type: 'DASHBOARD_ERROR', payload: e.response.data.message || "Error"  }] )
                    
                })
        }
        else {
            dispatch([{ type: 'DASHBOARD_ERROR', payload: "User must be logged" }])
        }
    }
}

export function getPortfolio(){
    return dispatch => {
        const identity = loadState('identity')
        if (identity) {
            axios.get(`${consts.API_URL}/username/portfolio`, { headers: { session: identity.sessionId } })
                .then(resp => {
                    dispatch({ type: 'PORTFOLIO_FETCHED', payload: resp.data.result.assets })
                })
                .catch(e => {
                    dispatch({ type: 'DASHBOARD_ERROR', payload: e.response.data.message || "Error" })
                })
        }
        else {
            dispatch({ type: 'DASHBOARD_ERROR', payload: "User must be logged" })
        }
    }
}
export function getOrders(){
    return dispatch => {
        const identity = loadState('identity')
        if (identity) {
            axios.get(`${consts.API_URL}/username/exchange-orders`, { headers: { session: identity.sessionId } })
                .then(resp => {
                    dispatch({ type: 'ORDERS_FETCHED', payload: resp.data.result.orderList })
                })
                .catch(e => {
                    dispatch({ type: 'DASHBOARD_ERROR', payload: e.response.data.message || "Error"})
                })
        }
        else {
            dispatch({ type: 'DASHBOARD_ERROR', payload: "User must be logged" })
        }
    }
}