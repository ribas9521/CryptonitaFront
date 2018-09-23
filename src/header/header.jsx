import React, { Component } from 'react'
import './headerStyle.css'
import { logout, login } from '../auth/authActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import PerfilHeader from './perfilHeader/perfilHeader'

class Header extends Component {
    componentDidMount() {
        $('#side-menu').metisMenu();
        this.handleLogout = this.handleLogout.bind(this)
    }
    handleLogout() {
        const { logout } = this.props
        logout();
    }
    componentWillMount() {
        const { userAuthenticated, login } = this.props
        !userAuthenticated ? login() : null
    }
    render() {
        const { userAuthenticated, logout, identity } = this.props
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

                    <PerfilHeader userAuthenticated={userAuthenticated} logout={logout} identity={identity} />

                </ul>
                <div className="navbar-default sidebar" role="navigation">
                    <div className="sidebar-nav navbar-collapse">
                        <ul className="nav" id="side-menu">
                            <li>
                                <a href="javascript:void(0)"><i className="fa fa-bullseye"></i>Dashboard <span className="fa arrow"></span></a>
                                <ul className="nav nav-second-level">
                                    <li>
                                        <a href="index.html">Dashboard 1</a>
                                    </li>
                                    <li>
                                        <a href="index2.html">Dashboard 2</a>
                                    </li>
                                    <li>
                                        <a href="index3.html">Dashboard 3</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:void(0)"><i className="ti ti-desktop"></i>Advance Apps <span className="fa arrow"></span></a>
                                <ul className="nav nav-second-level">
                                    <li>
                                        <a href="calender.html">calender</a>
                                    </li>
                                    <li>
                                        <a href="contact.html">Contact List</a>
                                    </li>
                                    <li>
                                        <a href="employee.html">Employee</a>
                                    </li>
                                    <li>
                                        <a href="contact-grid.html">Contact Grid</a>
                                    </li>
                                    <li>
                                        <a href="chat.html">Chat</a>
                                    </li>
                                </ul>
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