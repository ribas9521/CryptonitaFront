import axios from 'axios'
import consts from '../common/helpers/consts'
import { loadState } from "../common/helpers/localStorage";
import { toastr } from "react-redux-toastr";

export function getPublicProfile(userId) {
    return dispatch => {
        dispatch({ type: 'PUBLIC_PROFILE_FETCHING', payload: true })
        const identity = loadState('identity')
        axios.get(`${consts.API_URL}/username/profile/${userId}`,
            { headers: { session: identity ? identity.sessionId : null } })
            .then(resp => {
                dispatch([{ type: 'PUBLIC_PROFILE_FETCHED', payload: resp.data.result },
                { type: 'PUBLIC_PROFILE_FETCHING', payload: false }
                ])
            })
            .catch(e => {
                toastr.error("Error","Error in fetching profile")
                dispatch([{ type: 'PUBLIC_PROFILE_ERROR', payload: "Error in fetching profile " },
                { type: 'PUBLIC_PROFILE_FETCHING', payload: false }
                ])
            })
    }
}
