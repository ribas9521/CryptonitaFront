import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Login from './auth/login/login'
import TraderList from './traderList/traderList';
import Register from './auth/register/register';
import Forgot from './auth/forgot/forgot';
import ConfirmEmail from './auth/confirmEmail/confirmEmail';
import Reset from './auth/reset/reset';
import Dashboard from './dashboard/dashboard';
import ChangePassword from './auth/change/changePassword'
import Profile from './profile/profile'
import PublicProfile from './publicProfile/publicProfile'
import InvestorList from './traderList/investorList';


export default props=>(
    <Switch>
        <Route exact path='/' component={PublicProfile}/>
        <Route exact path ='/login' component={Login}/>
        <Route exact path='/traderlist' component={TraderList} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/forgotpassword' component={Forgot} />
        <Route exact path='/confirmemail' component={ConfirmEmail} />
        <Route exact path='/resetpassword' component={Reset} />
        <Route exact path='/changepassword' component={ChangePassword} />
        <Route exact path='/dashboard/' component={Dashboard} />
        <Route exact path='/profile/' component={Profile} />
        <Route exact path='/publicProfile/:id' component={PublicProfile} />
        <Route exact path='/investorList' component={InvestorList} />
    </Switch>
) 