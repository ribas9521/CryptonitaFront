import { combineReducers } from "redux";
import TraderListReducer from './traderList/traderListReducer'
import {reducer as formReducer} from 'redux-form'
import AuthReducer from './auth/authReducer'
import DashboardReducer from './dashboard/dashboardReducer'
import ProfileReducer from './profile/profileReducer'
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
    traderList: TraderListReducer,
    form: formReducer,
    auth: AuthReducer,
    dashboard: DashboardReducer,
    profile: ProfileReducer,
    toastr: toastrReducer
})

export default rootReducer