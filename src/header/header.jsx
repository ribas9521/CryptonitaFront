import React, {Component} from 'react'

export default class Header extends Component{
    componentDidMount() {
        $('#side-menu').metisMenu();
    }
    render(){
        return(
            <nav className="navbar navbar-default navbar-static-top" style={{ "marginBottom": "0" }}>
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#"><img src="assets/img/head-logo.png" className="img-responsive" alt="Logo" /></a>
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
                    <li className="dropdown">
                        <a className="dropdown-toggle notification-show" data-toggle="dropdown" href="#">
                            <i className="ti-email"></i>
                            <span className="email-notify noti-count">4</span>
                        </a>
                        <ul className="dropdown-menu dropdown-messages right-swip">
                            <li className="external">
                                <h3><span className="bold">Notifications</span></h3>
                                <span className="notification-label bg-success">New 6</span>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="message-apt">
                                        <div className="user-img">
                                            <img src="http://via.placeholder.com/500x500" className="img-responsive img-circle" alt="" />
                                            <span className="profile-status online"></span>
                                        </div>
                                        <div className="message-body">
                                            <strong>John Smith</strong>
                                            <span className="pull-right text-muted">
                                                Just Now
											</span>
                                            <p>I am John Smith Ckeck My...</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="message-apt">
                                        <div className="user-img">
                                            <img src="http://via.placeholder.com/500x500" className="img-responsive img-circle" alt="" />
                                            <span className="profile-status warning"></span>
                                        </div>
                                        <div className="message-body">
                                            <strong>Daniel Luke</strong>
                                            <span className="pull-right text-muted">
                                                2 Min Ago
											</span>
                                            <p>Can You Send Me your Bugdet...</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="message-apt">
                                        <div className="user-img">
                                            <img src="http://via.placeholder.com/500x500" className="img-responsive img-circle" alt="" />
                                            <span className="profile-status busy"></span>
                                        </div>
                                        <div className="message-body">
                                            <strong>Litha Lilly</strong>
                                            <span className="pull-right text-muted">
                                                7 Min Ago
											</span>
                                            <p>I have Check Your Design Like...</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="message-apt">
                                        <div className="user-img">
                                            <img src="http://via.placeholder.com/500x500" className="img-responsive img-circle" alt="" />
                                            <span className="profile-status offline"></span>
                                        </div>
                                        <div className="message-body">
                                            <strong>Adam Kruel</strong>
                                            <span className="pull-right text-muted">
                                                1 Hour Ago
											</span>
                                            <p>Heelo! I need best web design...</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a className="text-center" href="#">
                                    <strong>Read All Messages</strong>
                                    <i className="fa fa-angle-right"></i>
                                </a>
                            </li>
                        </ul>

                    </li>

                    <li className="dropdown">
                        <a className="dropdown-toggle notification-show" data-toggle="dropdown" href="#">
                            <i className="ti-bell"></i>
                            <span className="task-notify noti-count">7</span>
                        </a>
                        <ul className="task dropdown-menu dropdown-tasks right-swip">
                            <li>
                                <a href="#">
                                    <div className="task-overview">
                                        <div className="alpha-box alpha-a">
                                            <span>A</span>
                                        </div>
                                        <div className="task-detail">
                                            <p>Hello, I am Maryam.</p>
                                            <span className="task-time">2 Min Ago</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="task-overview">
                                        <div className="alpha-box alpha-d">
                                            <span>D</span>
                                        </div>
                                        <div className="task-detail">
                                            <p>Hello, I am Maryam.</p>
                                            <span className="task-time">2 Min Ago</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="task-overview">
                                        <div className="alpha-box alpha-g">
                                            <span>G</span>
                                        </div>
                                        <div className="task-detail">
                                            <p>Hello, I am Maryam.</p>
                                            <span className="task-time">2 Min Ago</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="task-overview">
                                        <div className="alpha-box alpha-h">
                                            <span>H</span>
                                        </div>
                                        <div className="task-detail">
                                            <p>Hello, I am Maryam.</p>
                                            <span className="task-time">2 Min Ago</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a className="text-center" href="#">
                                    <strong>See All Tasks</strong>
                                    <i className="fa fa-angle-right"></i>
                                </a>
                            </li>
                        </ul>

                    </li>

                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i className="ti-announcement"></i>
                        </a>
                        <div className="dropdown-menu dropdown-grid animated flipInX">
                            <a href="../../index.html" className="dropdown-item">
                                <img src="http://via.placeholder.com/128x128" className="img-responsive" alt="" />
                                <span className="dropdown-title">Dashboard</span>
                            </a>
                            <a href="chat.html" className="dropdown-item">
                                <img src="http://via.placeholder.com/128x128" className="img-responsive" alt="" />
                                <span className="dropdown-title">Chat</span>
                            </a>
                            <a href="inbox.html" className="dropdown-item">
                                <img src="http://via.placeholder.com/128x128" className="img-responsive" alt="" />
                                <span className="dropdown-title">Emails</span>
                            </a>
                            <a href="contact-grid.html" className="dropdown-item">
                                <img src="http://via.placeholder.com/128x128" className="img-responsive" alt="" />
                                <span className="dropdown-title">Contact</span>
                            </a>
                            <a href="chartjs.html" className="dropdown-item">
                                <img src="http://via.placeholder.com/128x128" className="img-responsive" alt="" />
                                <span className="dropdown-title">Chart</span>
                            </a>
                            <a href="profile-page.html" className="dropdown-item">
                                <img src="http://via.placeholder.com/128x128" className="img-responsive" alt="" />
                                <span className="dropdown-title">Profile</span>
                            </a>
                        </div>

                    </li>

                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                            <img src="http://via.placeholder.com/400x400" className="img-responsive img-circle" alt="user" />
                        </a>
                        <ul className="dropdown-menu dropdown-user right-swip">
                            <li><a href="#"><i className="fa fa-user fa-fw"></i> User Profile</a>
                            </li>
                            <li><a href="#"><i className="fa fa-gear fa-fw"></i> Settings</a>
                            </li>
                            <li><a href="login.html"><i className="fa fa-sign-out fa-fw"></i> Logout</a>
                            </li>

                        </ul>

                    </li>
                    <li><a id="right-sidebar-toggle" href="#" className="btn btn-lg toggle"><i className="spin ti-settings"></i></a></li>


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
                                <a href="javascript:void(0)"><i class="ti ti-desktop"></i>Advance Apps <span class="fa arrow"></span></a>
                                <ul class="nav nav-second-level">
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