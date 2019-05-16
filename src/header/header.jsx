
import React, { Component } from 'react'
import './headerStyle.css'
import { logout, login } from '../auth/authActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import PerfilHeader from './perfilHeader/perfilHeader'
import {loadState} from '../common/helpers/localStorage'
import { withRouter } from "react-router-dom";


class Header extends Component {
    componentDidMount() {
        //$('#side-menu').metisMenu();
        this.handleLogout = this.handleLogout.bind(this)
        this.handleActive = this.handleActive.bind(this)
        this.handleGoToProfile = this.handleGoToProfile.bind(this)
    }
    handleLogout() {
        const { logout } = this.props
        logout();
        this.props.history.push('/')
      
    }
    handleGoToProfile(e){
        e.preventDefault()
        const history = createHistory()
        const route = this.getUserId() !== 0 ? `/publicProfile/${this.getUserId()}` : "/login"
        this.props.history.push('/')
        this.props.history.push(route)
    }
    componentWillMount() {
        const { userAuthenticated, login } = this.props
        !userAuthenticated || userAuthenticated ==='initial' ? login() : null
    }
    handleActive(path){       
        if ((createHistory().location.pathname).includes(path))
            return 'tab-active'
        return ''
        
    }
    getUserId(){
        const id = loadState("identity")
        if(id)
            return loadState("identity").username.usernameId
        else
            return 0
    }
    render() {
        const userId = this.getUserId();
        const { userAuthenticated, logout, identity } = this.props
        const initialIdentity= {
            username:{
                name: ''
            }
        }
        return (
            <nav className="navbar navbar-default navbar-static-top" style={{ "marginBottom": "0" }}>
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#"><img src={require("../vendor/assets/img/head-logo-beta.png")} className="img-responsive" alt="Logo" /></a>
                </div>
                <ul className="nav navbar-top-links navbar-left header-search-form hidden-xs">
                    <li><a className="menu-brand" id="menu-toggle"><span className="ti-view-grid"></span></a></li>
                    {/* <li className="hidden-sm hidden-xs">
                        <div className="header-search-form input-group">
                            <span className="input-group-addon"><span className="ti-search"></span></span>
                            <input type="text" className="form-control" placeholder="SearchEnter" />
                        </div>
                    </li> */}
                </ul>
                <ul className="nav navbar-top-links navbar-right">

                    <PerfilHeader handleGoToProfile={this.handleGoToProfile} userAuthenticated={userAuthenticated} logout={this.handleLogout} identity={identity || initialIdentity} />

                </ul>
                <div className="navbar-default sidebar" role="navigation">
                    <div className="sidebar-nav navbar-collapse">
                        <ul className="nav" id="side-menu">
                            <li> 
                                <a onClick={(e)=>this.handleGoToProfile(e)} href="#" className={this.handleActive('/publicProfile')}><i className="fa fa-bullseye"></i>Dashboard</a>

                            </li>
                            
                            <li >
                                <Link to="/traderList" className={this.handleActive('/traderList')}><i className="fa fa-user"></i>Traders List </Link>                               
                                
                            </li>
                            {/* <li>
                                <Link to="/investorList" className={this.handleActive('/investorList')}><i className="fa fa-user-o"></i>User List </Link>                               
                                
                            </li> */}

                        </ul>
                    </div>

                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return { userAuthenticated: state.auth.userAuthenticated, identity: state.auth.identity }
}

const mapDispatchToProps = dispatch => {
    return (bindActionCreators({ logout, login }, dispatch))
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))