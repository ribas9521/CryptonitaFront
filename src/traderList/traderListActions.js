import axios from 'axios'
import consts from '../common/helpers/consts'
import { loadState, saveState, removeState } from "../common/helpers/localStorage";
import { toastr } from "react-redux-toastr";
import { onlineCheck } from '../offlinePage/onlineCheck';
import Swal from 'sweetalert2'


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
    return (dispatch, getState) => {
        const identity = loadState('identity')
        if (identity) {
            Swal.fire({
                type: 'warning',
                title: 'Your are about to follow a trader',
                text: 'All his new operations will be copied to you',
                showCancelButton: true,
                confirmButtonText: 'Follow',
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Swal.isLoading(),
                preConfirm: () => {
                    return new Promise((resolve, reject) => {
                        axios.post(`${consts.API_URL}/username/follow`, values, { headers: { session: identity.sessionId } })
                            .then(resp => {
                                dispatch([
                                    { type: 'USER_FOLLOWING', payload: values.usernameId }
                                ])
                                resolve()
                            })
                            .catch(e => {
                                toastr.error('Error', e.response.data.message)
                                dispatch([{ type: 'USER_FOLLOWING_ERROR', payload: e.response.data.message },
                                ])
                                reject(e.response.data.message)
                            })

                    })
                }

            }).then((result) => {
                if (result.value) {
                    Swal.fire({
                        type: 'success',
                        title: `Following the master`
                    })

                }
            }).catch((e) => {
                Swal.fire({
                    type: 'danger',
                    title: `Error`,
                    text: e
                })
            })

        }
        else {
            toastr.warning("Please Register", "You must be authenticated")
            dispatch({ type: 'USER_FOLLOWING_ERROR', payload: 'invalid identity' })
        }
    }
}

export function setUnfollow(values) {
    return (dispatch, getState) => {
        const identity = loadState('identity')
        if (identity) {
            Swal.fire({
                type: 'warning',
                title: 'Your are about to stop following the trader',
                text: "You will not replicate his operations anymore, and your portfolio will keep the same",
                showCancelButton: true,
                confirmButtonText: 'Stop Following',
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Swal.isLoading(),
                preConfirm: () => {
                    return new Promise((resolve, reject) => {
                        axios.delete(`${consts.API_URL}/username/follow`, { headers: { session: identity.sessionId } })
                            .then(resp => {
                                toastr.success('Done', 'Unfollowed')
                                dispatch([
                                    { type: 'USER_FOLLOWING', payload: false }
                                ])
                                resolve()
                            })
                            .catch(e => {
                                toastr.error('Done', e.response.data.message)
                                dispatch({ type: 'USER_UNFOLLOWING_ERROR', payload: e.response.data.message })
                                reject(e.response.data.message)
                            })
                    })
                }

            }).then((result) => {
                if (result.value) {
                    Swal.fire({
                        type: 'success',
                        title: `Unfollowed`,
                        text: "Take care it's dangerous to go alone"
                    })

                }
            }).catch((e) => {
                Swal.fire({
                    type: 'danger',
                    title: `Error`,
                    text: e
                })
            })

        }
        else {
            toastr.warning("Please Register", "You must be authenticated")
            dispatch({ type: 'USER_FOLLOWING_ERROR', payload: 'invalid identity' })
        }
    }
    // return dispatch => {
    //     const identity = loadState('identity')
    //     if (identity) {
    //         axios.delete(`${consts.API_URL}/username/follow`, { headers: { session: identity.sessionId } })
    //             .then(resp => {
    //                 toastr.success('Done', 'Unfollowed')
    //                 dispatch([
    //                     { type: 'USER_FOLLOWING', payload: false }
    //                 ])
    //             })
    //             .catch(e => {
    //                 toastr.error('Done', e.response.data.message)
    //                 dispatch({ type: 'USER_UNFOLLOWING_ERROR', payload: e.response.data.message })
    //             })
    //     }
    //     else {
    //         dispatch({ type: 'USER_UNFOLLOWING_ERROR', payload: 'invalid identity' })
    //     }
    // }
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

export function resetUserFollowing() {
    return dispatch => {
        dispatch({ type: 'USER_FOLLOWING', payload: 'initial' })
    }
}