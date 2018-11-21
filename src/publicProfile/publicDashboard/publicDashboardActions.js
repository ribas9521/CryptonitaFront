import axios from 'axios'
import consts from '../../common/helpers/consts'
import { loadState } from "../../common/helpers/localStorage";
import { toastr } from "react-redux-toastr";

export function getPortfolio() {
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
export function getOrders() {
    return dispatch => {
        const identity = loadState('identity')
        if (identity) {
            axios.get(`${consts.API_URL}/username/exchange-orders`, { headers: { session: identity.sessionId } })
                .then(resp => {
                    dispatch({ type: 'ORDERS_FETCHED', payload: resp.data.result.orderList })
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