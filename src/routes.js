import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Login from './auth/login/login'
import Mirror from './mirror/mirror';
import Register from './auth/register/register';

export default props=>(
    <Switch>
        <Route exact path ='/' component={Login}/>
        <Route exact path ='/login' component={Login}/>
        <Route exact path='/mirror' component={Mirror} />
        <Route exact path='/register' component={Register} />
    </Switch>
) 