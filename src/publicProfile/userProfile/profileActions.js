import axios from 'axios'
import consts from '../../common/helpers/consts'
import { loadState, saveState, removeState } from "../../common/helpers/localStorage";
import { toastr } from "react-redux-toastr";


export function getProfile() {
    return dispatch => {
        const identity = loadState('identity')
        if (identity) {
            dispatch([{ type: 'PROFILE_FETCHED', payload: identity.username }, getApi()])
        }
        else{
            dispatch([{ type: 'PROFILE_ERROR', payload: 'Invalid identity' }])
        }
    }

}

export function setApi(values) {
    return dispatch => {
        const identity = loadState('identity')
        if (identity) {
            axios.post(`${consts.API_URL}/username/integration`, values, { headers: { session: identity.sessionId } })
                .then(resp => {
                    toastr.success('success','API successfully registered')
                    dispatch([
                        { type: 'API_KEY_REGISTERED', payload: true }, getApi()
                    ] )
                })

                .catch(e => {
                    toastr.error('Error','Error in API Key register')
                    dispatch([{ type: 'API_KEY_ERROR', payload: e.response.data.message || "API key Error" }])
                })
        }
        else {
            dispatch([{ type: 'API_KEY_ERROR', payload: 'invalid identity' }])
        }
    }
}
export function resetApiRegisterdState(){
    return dispatch => dispatch({ type: 'API_KEY_REGISTERED', payload: false })
}

export function getApi() {
    const identity = loadState('identity')
    return dispatch => {
        if (identity) {
            axios.get(`${consts.API_URL}/username/integration`, { headers: { session: identity.sessionId } })
                .then(resp => {
                    dispatch([
                        { type: 'API_KEY_FETCHED', payload: resp.data.result }
                    ])
                })

                .catch(e => {
                    toastr.error('Error', "Can't load your registered API")
                    dispatch([{ type: 'API_KEY_ERROR', payload: e.response.data.message || "API key Error" }])
                })
        }
        else {
            dispatch([{ type: 'API_KEY_ERROR', payload: 'Invalid identity' }])
        }
    }
}
export function deleteApi(){
    const identity = loadState('identity')
    return dispatch => {
        if (identity) {
            axios.delete(`${consts.API_URL}/username/integration`, { headers: { session: identity.sessionId } })
                .then(resp => {
                    toastr.success('success', 'API successfully deleted')
                    dispatch([
                        { type: 'API_KEY_DELETED', payload: true }, getApi()
                    ])
                })
                .catch(e => {
                    toastr.error('Error', "Error in removing your API Keys")
                    dispatch([{ type: 'API_KEY_ERROR', payload: e.response.data.message || "API key Error" }])
                })
        }
        else {
            dispatch([{ type: 'API_KEY_ERROR', payload: 'invalid identity' }])
        }
    }
}