import axios from 'axios'
import consts from '../common/helpers/consts'
import { loadState, saveState, removeState } from "../common/helpers/localStorage";
import { toastr } from "react-redux-toastr";
import { onlineCheck } from '../offlinePage/onlineCheck';


export function getTraders(values) {
    return dispatch => {
        const identity = loadState('identity')
        dispatch({ type: 'TRADERS_LIST_FETCHING', payload: true })
        axios.get(`${consts.API_URL}/username/trader-list`, identity && { headers: { session: identity.sessionId } })
            .then(resp => {
                dispatch([{ type: 'TRADERS_LIST_FETCHED', payload: resp.data.result }])
                dispatch({ type: 'TRADERS_LIST_FETCHING', payload: false })
            })
            .catch(e => {
                if (!e.response) {
                    toastr.error('No Internet Connection')
                    dispatch({ type: 'TRADERS_LIST_FETCHING', payload: false })
                    onlineCheck()
                }
                else {
                    toastr.error('')
                    dispatch({ type: 'TRADERS_LIST_ERROR', payload: 'Error in retriving traders' })
                    dispatch({ type: 'TRADERS_LIST_FETCHING', payload: false })
                }

            })
    }
}

export function setFollow(values) {
    return dispatch => {
        const identity = loadState('identity')
        if (identity) {
            axios.post(`${consts.API_URL}/username/follow`, values, { headers: { session: identity.sessionId } })
                .then(resp => {
                    toastr.success('Done', 'Following the master!')
                    dispatch([
                        { type: 'USER_FOLLOWING', payload: values.usernameId }
                       ])
                })
                .catch(e => {
                    toastr.error('Error', e.response.data.message)
                    dispatch({ type: 'USER_FOLLOWING_ERROR', payload: e.response.data.message })
                })
        }
        else {
            toastr.warning("Please Register", "You must be authenticated")
            dispatch({ type: 'USER_FOLLOWING_ERROR', payload: 'invalid identity' })
        }
    }
}

export function setUnfollow(values) {
    return dispatch => {
        const identity = loadState('identity')
        if (identity) {
            axios.delete(`${consts.API_URL}/username/follow`, { headers: { session: identity.sessionId } })
                .then(resp => {
                    toastr.success('Done', 'Unfollowed')
                    dispatch([
                        { type: 'USER_FOLLOWING', payload: false }
                        ])
                })
                .catch(e => {
                    toastr.error('Done', e.response.data.message)
                    dispatch({ type: 'USER_UNFOLLOWING_ERROR', payload: e.response.data.message })
                })
        }
        else {
            dispatch({ type: 'USER_UNFOLLOWING_ERROR', payload: 'invalid identity' })
        }
    }
}


export function getInvestors() {
    return dispatch => {
        axios.get(`${consts.API_URL}/username/investors-list`)
            .then(resp => {
                dispatch([{ type: 'INVESTORS_LIST_FETCHED', payload: resp.data.result }])
            })
            .catch(e => {
                if (!e.response) {
                    toastr.error('No Internet Connection')
                    onlineCheck()
                }
                else {
                    toastr.error('Error in retriving investors')
                    dispatch({ type: 'INVESTORS_LIST_ERROR', payload: e })
                }

            })
    }
}

export function resetUserFollowing(){
    return dispatch => {
        dispatch({ type: 'USER_FOLLOWING', payload: 'initial' })
    }
}