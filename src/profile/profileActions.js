import axios from 'axios'
import consts from '../common/helpers/consts'
import { loadState, saveState, removeState } from "../common/helpers/localStorage";

const profile = {
    picture: 'https://lh3.googleusercontent.com/-TLqKvsqNUCU/WzKdDgWBQsI/AAAAAAAACOU/A9N7wW2jqOcHKyoXlp4DSH80ekchQ0YgwCEwYBhgL/w140-h140-p/31694828_206221469984077_2366797807848783872_n.jpg',
    cover: 'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=350',
    name: 'Guilherme Ribas',
    smallDesc: 'Pro Trader since 2016',
    bigDesc: 'Sergey from Latvia is a Popular Investor who keeps his risk score low. He has been with eToro since late 2017 and says he has 8 years of trading experience. He rotates his portfolio by the end of each quarter, and uses short positions as a diversification tool. He recommends copying him with $1,000.'


}
export function getProfile(id) {
    return dispatch => {
        dispatch({ type: 'PROFILE_FETCHED', payload: profile })
    }

}

export function setApi(values) {
    return dispatch => {
        const identity = loadState('identity')
        if (identity) {
            axios.post(`${consts.API_URL}/username/integration`, values, { headers: { session: identity.sessionId } })
                .then(resp => {
                    dispatch([
                        { type: 'API_KEY_REGISTERED', payload: true }
                    ])
                })

                .catch(e => {
                    dispatch({ type: 'API_KEY_ERROR', payload: e.response.data.message })
                })
        }
        else{
            dispatch({ type: 'API_KEY_ERROR', payload: 'invalid identity' })
        }
    }
}