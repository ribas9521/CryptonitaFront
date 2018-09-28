import { combineReducers } from "redux";
import TraderListReducer from './traderList/traderListReducer'
import {reducer as formReducer} from 'redux-form'
import AuthReducer from './auth/authReducer'

const rootReducer = combineReducers({
    traderList: TraderListReducer,
    form: formReducer,
    auth: AuthReducer
})

export default rootReducer