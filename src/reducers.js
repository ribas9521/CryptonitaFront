import { combineReducers } from "redux";
import TraderListReducer from './traderList/traderListReducer'
import {reducer as formReducer} from 'redux-form'
import AuthReducer from './auth/authReducer'
import ProfileReducer from './profile/profileReducer'
import { reducer as toastrReducer } from 'react-redux-toastr'
import PublicDashboardReducer from "./publicProfile/publicDashboard/publicDashboardReducer";
import PublicProfileReducer from "./publicProfile/publicProfileReducer";

const rootReducer = combineReducers({
    traderList: TraderListReducer,
    form: formReducer,
    auth: AuthReducer,
    profile: ProfileReducer,
    toastr: toastrReducer,
    publicDashboard: PublicDashboardReducer,
    publicProfile: PublicProfileReducer
})

export default rootReducer