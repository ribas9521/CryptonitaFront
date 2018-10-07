import axios from 'axios'
import consts from '../common/helpers/consts'
import { loadState, saveState, removeState } from "../common/helpers/localStorage";

const traders = [
    {
        picture: 'https://media.licdn.com/dms/image/C5103AQHkkjTpls2Cvw/profile-displayphoto-shrink_800_800/0?e=1544054400&v=beta&t=MeTC9CkxTYZAW5WXagqUnfED2bNy5lupt353iPAw53c',
        cover: 'https://www.50-best.com/images/badass_facebook_covers/ace_of_spade_badass_cover.jpg',
        name: 'Vô Epa',
        change24h: 1,
        change7d: 12,
        change30d: 32,
        totalReturn: 112,
        followers: 23,
        size: 12,
        data: {
            data24h: [1, -5, 3, 5, 22, 25, 32, 22],
            data7d: [1, -5, 3, 5, 22, 25, 32, 22],
            data30d: [1, -5, 3, 5, 22, 25, 32, 22]
        },
        description: 'Sergey from Latvia is a Popular Investor who keeps his risk score low. He has been with eToro since late 2017 and says he has 8 years of trading experience. He rotates his portfolio by the end of each quarter, and uses short positions as a diversification tool. He recommends copying him with $1,000.'

    },
    {
        picture: 'https://lh3.googleusercontent.com/-TLqKvsqNUCU/WzKdDgWBQsI/AAAAAAAACOU/A9N7wW2jqOcHKyoXlp4DSH80ekchQ0YgwCEwYBhgL/w140-h140-p/31694828_206221469984077_2366797807848783872_n.jpg',
        cover: 'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=350',
        name: 'Guilherme Ribas',
        change24h: 1,
        change7d: 12,
        change30d: 32,
        totalReturn: 112,
        followers: 23,
        size: 12,
        data: {
            data24h: [1, -5, 3, 5, 22, 25, 32, 22],
            data7d: [1, -5, 3, 5, 22, 25, 32, 22],
            data30d: [1, -5, 3, 5, 22, 25, 32, 22]
        },
        description: 'Sergey from Latvia is a Popular Investor who keeps his risk score low. He has been with eToro since late 2017 and says he has 8 years of trading experience. He rotates his portfolio by the end of each quarter, and uses short positions as a diversification tool. He recommends copying him with $1,000.'

    },
    {
        picture: 'https://scontent.fsdu17-1.fna.fbcdn.net/v/t1.0-9/15665866_102441916926717_5383972772627463347_n.jpg?_nc_cat=111&oh=e26d79eda189dd890c2e06c0f7841f90&oe=5C527A22',
        cover: 'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=350',
        name: 'Guilherme Ribas',
        change24h: 1,
        change7d: 12,
        change30d: 32,
        totalReturn: 112,
        followers: 23,
        size: 12,
        data: {
            data24h: [1, -5, 3, 5, 22, 25, 32, 22],
            data7d: [1, -5, 3, 5, 22, 25, 32, 22],
            data30d: [1, -5, 3, 5, 22, 25, 32, 22]
        },
        description: 'Sergey from Latvia is a Popular Investor who keeps his risk score low. He has been with eToro since late 2017 and says he has 8 years of trading experience. He rotates his portfolio by the end of each quarter, and uses short positions as a diversification tool. He recommends copying him with $1,000.'

    }
]


export function getTraders(values) {
    return dispatch => {
        axios.get(`${consts.API_URL}/username/trader-list`)
            .then(resp => {
                dispatch({ type: 'TRADERS_LIST_FETCHED', payload: resp.data.result })
            })
            .catch(e => {
                dispatch({ type: 'TRADERS_LIST_ERROR', payload: e.response.data.message })
            })
    }
}