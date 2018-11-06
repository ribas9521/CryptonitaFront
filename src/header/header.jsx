
import React, { Component } from 'react'
import './headerStyle.css'
import { logout, login } from '../auth/authActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import createHistory from 'history/createHashHistory'
import PerfilHeader from './perfilHeader/perfilHeader'



class Header extends Component {
    componentDidMount() {
        //$('#side-menu').metisMenu();
        this.handleLogout = this.handleLogout.bind(this)
        this.handleActive = this.handleActive.bind(this)
    }
    handleLogout() {
        const { logout } = this.props
        const history = createHistory()
        logout();
        history.push('/login')
    }
    componentWillMount() {
        const { userAuthenticated, login } = this.props
        !userAuthenticated || userAuthenticated ==='initial' ? login() : null
    }
    handleActive(path){       
        if (path === createHistory().location.pathname)
            return 'tab-active'
        return ''
        
    }
    render() {
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
                    <a className="navbar-brand" href="#"><img src={require("../vendor/assets/img/head-logo.png")} className="img-responsive" alt="Logo" /></a>
                </div>
                <ul className="nav navbar-top-links navbar-left header-search-form hidden-xs">
                    <li><a className="menu-brand" id="menu-toggle"><span className="ti-view-grid"></span></a></li>
                    <li className="hidden-sm hidden-xs">
                        <div className="header-search-form input-group">
                            <span className="input-group-addon"><span className="ti-search"></span></span>
                            <input type="text" className="form-control" placeholder="SearchEnter" />
                        </div>
                    </li>
                </ul>
                <ul className="nav navbar-top-links navbar-right">

                    <PerfilHeader userAuthenticated={userAuthenticated} logout={this.handleLogout} identity={identity || initialIdentity} />

                </ul>
                <div className="navbar-default sidebar" role="navigation">
                    <div className="sidebar-nav navbar-collapse">
                        <ul className="nav" id="side-menu">
                            <li onClick={()=>this.forceUpdate()}> 
                                <Link to="/dashboard" className={this.handleActive('/dashboard')}><i className="fa fa-bullseye"></i>Dashboard</Link>

                            </li>
                            <li onClick={()=>this.forceUpdate()}>
                                <Link to="/profile" className={this.handleActive('/profile')}><i className="fa fa-user"></i>Profile </Link>                               
                                
                            </li>
                            <li onClick={() => this.forceUpdate()}>
                                <Link to="/traderList" className={this.handleActive('/traderList')}><i className="fa fa-users"></i>Traders List </Link>                               
                                
                            </li>

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

export default connect(mapStateToProps, mapDispatchToProps)(Header)