import axios from 'axios'
import consts from '../common/helpers/consts'
import { loadState, saveState, removeState } from "../common/helpers/localStorage";
import { toastr } from "react-redux-toastr";

export function login(values) {
    return dispatch => {
        const identity = loadState('identity')
        if (identity) {
            axios.get(`${consts.API_URL}/username/verify`, { headers: { session: identity.sessionId } })
                .then(resp => {
                    if (resp.data.status === "ok") {
                        dispatch([{ type: 'USER_IDENTITY_FETCHED', payload: identity },
                        { type: 'USER_AUTHENTICATED', payload: true }
                        ])
                    }
                })
                .catch(e => {
                    toastr.error("Error", e.response.data.message)
                    dispatch([{ type: 'AUTH_ERROR', payload: e.response.data.message || "Error" },
                { type: 'USER_AUTHENTICATED', payload: false }])
                })
        }
        if (values) {
            axios.post(`${consts.API_URL}/username/auth`, values)
                .then(resp => {
                    dispatch([
                        [saveState('identity', resp.data.result),
                        { type: 'USER_IDENTITY_FETCHED', payload: resp.data.result },
                        { type: 'USER_AUTHENTICATED', payload: true }
                        ]
                    ])
                })
                .catch(e => {
                    toastr.error("Error", e.response.data.message)
                    dispatch([{ type: 'AUTH_ERROR', payload: e.response.data.message || "Error" },
                        { type: 'USER_AUTHENTICATED', payload: false }])
                })
        }
        if(!identity && !values){
            dispatch([
            { type: 'USER_AUTHENTICATED', payload: false }])
        }
    }
}
export function signup(values) {
    return dispatch => {
        axios.post(`${consts.API_URL}/username/register`, values)
            .then(resp => {
                dispatch([
                    { type: 'USER_CREATED', payload: true }
                ])
            })
            .catch(e => {
                toastr.error("Error", e.response.data.message)
                dispatch({ type: 'AUTH_ERROR', payload: e.response.data.message || "Error" })
            })
    }
}

export function confirmEmail(values) {
    return dispatch => {
        axios.post(`${consts.API_URL}/username/email-validation`, values)
            .then(resp => {
                dispatch({ type: 'EMAIL_VERIFIED', payload: true })
            })
            .catch(e => {
                toastr.error("Error", e.response.data.message)
                dispatch({ type: 'AUTH_ERROR', payload: e.response.data.message || "Error" })
            })
    }
}

export function logout() {
    return dispatch => {
        dispatch([removeState('identity'),
        { type: 'USER_AUTHENTICATED', payload: false }])
    }
}

export function forgot(values) {
    return dispatch => {
        axios.get(`${consts.API_URL}/username/password-recovery?email=${values.email}`)
            .then(resp => {
                dispatch({ type: 'FORGOT_PASSWORD_SENT', payload: true })
            })
            .catch(e => {
                toastr.error("Error", e.response.data.message)
                dispatch({ type: 'AUTH_ERROR', payload: e.response.data.message || "Error" })
            })
    }
}

export function changePassword(values) {
    return dispatch => {
        const identity = loadState('identity')
        if (identity) {
            axios.post(`${consts.API_URL}/username/change-password`, values, { headers: { session: identity.sessionId } })
                .then(resp => {
                    dispatch({ type: 'PASSWORD_CHANGED', payload: true })
                })
                .catch(e => {
                    toastr.error("Error", e.response.data.message)
                    dispatch({ type: 'AUTH_ERROR', payload: e.response.data.message || "Error" })
                })
        }
        else {
            dispatch({ type: 'AUTH_ERROR', payload: "User must be logged" })
        }
    }
}

export function resetPassword(values) {
    return dispatch => {
        axios.post(`${consts.API_URL}/username/password-recovery`, values)
            .then(resp => {
                dispatch({
                    type: 'RESET_PASSWORD_DONE', payload: true
                })
            })
            .catch(e => {
                toastr.error("Error", e.response.data.message)
                dispatch({ type: 'AUTH_ERROR', payload: e.response.data.message || "Error" })
            })
    }
}

export function resetError() {
    return dispatch => {
        dispatch({ type: 'AUTH_ERROR', payload: null })
    }
}

export function resetUserCreated() {
    return dispatch => {
        dispatch({ type: 'USER_CREATED', payload: false })
    }
}

export function resetForgot() {
    return dispatch => {
        dispatch({ type: 'FORGOT_PASSWORD_SENT', payload: false })
    }
}
export function resetResetPassword() {
    return dispatch => {
        dispatch({ type: 'RESET_PASSWORD_DONE', payload: false })
    }
}

export function resetChangePassword() {
    return dispatch => {
        dispatch({ type: 'PASSWORD_CHANGED', payload: false })
    }
}