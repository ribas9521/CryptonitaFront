import { combineReducers } from "redux";
import MirrorReducer from './mirror/mirrorReducer'
import {reducer as formReducer} from 'redux-form'
import AuthReducer from './auth/authReducer'

const rootReducer = combineReducers({
    mirror: MirrorReducer,
    form: formReducer,
    auth: AuthReducer
})

export default rootReducer