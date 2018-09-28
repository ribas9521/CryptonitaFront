import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Login from './auth/login/login'
import TraderList from './traderList/traderList';
import Register from './auth/register/register';
import Forgot from './auth/forgot/forgot';
import ConfirmEmail from './auth/confirmEmail/confirmEmail';
import Reset from './auth/reset/reset';

export default props=>(
    <Switch>
        <Route exact path ='/' component={Login}/>
        <Route exact path ='/login' component={Login}/>
        <Route exact path='/traderList' component={TraderList} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/forgotpassword' component={Forgot} />
        <Route exact path='/confirmemail' component={ConfirmEmail} />
        <Route exact path='/resetpassword' component={Reset} />
    </Switch>
) 