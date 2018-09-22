import React from 'react'

export default props =>(
    <div id="sidebar-wrapper">
        <a id="right-close-sidebar-toggle" href="#" className="theme-bg btn close-toogle toggle">
            Setting Pannel <i className="ti-close"></i></a>
        <div className="right-sidebar" id="side-scroll">
            <div className="user-box">
                <div className="profile-img">
                    <img src="http://via.placeholder.com/400x400" alt="user" />

                    <div className="notify setpos"> <span className="heartbit"></span> <span className="point"></span> </div>
                </div>
                <div className="profile-text">
                    <h4>Daniel Dax</h4>
                    <a href="#" className="user-setting"><i className="ti-settings"></i></a>
                    <a href="#" className="user-mail"><i className="ti-email"></i></a>
                    <a href="#" className="user-call"><i className="ti-headphone"></i></a>
                    <a href="#" className="user-logout"><i className="ti-power-off"></i></a>
                </div>
                <div className="tabbable-line">
                    <ul className="nav nav-tabs ">
                        <li className="active">
                            <a href="#options" data-toggle="tab">
                                <i className="ti-palette"></i> </a>
                        </li>
                        <li>
                            <a href="#comments" data-toggle="tab">
                                <i className="ti-bell"></i> </a>
                        </li>
                        <li>
                            <a href="#freinds" data-toggle="tab">
                                <i className="ti-comment-alt"></i> </a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane active" id="options">
                            <div className="accept-request">
                                <div className="friend-overview">
                                    <div className="friend-overview-img">
                                        <img src="http://via.placeholder.com/500x500" className="img-responsive img-circle" alt="" />
                                        <span className="fr-user-status online"></span>
                                    </div>
                                    <div className="fr-request-detail">
                                        <h4>Adam Dax <span className="task-time pull-right">Just Now</span></h4>
                                        <p>Accept Your Friend Request</p>
                                    </div>
                                </div>
                                <div className="friend-overview">
                                    <div className="friend-overview-img">
                                        <img src="http://via.placeholder.com/500x500" className="img-responsive img-circle" alt="" />
                                        <span className="fr-user-status offline"></span>
                                    </div>
                                    <div className="fr-request-detail">
                                        <h4>Rita Ray <span className="task-time pull-right">2 Min Ago</span></h4>
                                        <p>Accept Your Friend Request</p>
                                    </div>
                                </div>
                                <div className="friend-overview">
                                    <div className="friend-overview-img">
                                        <img src="http://via.placeholder.com/500x500" className="img-responsive img-circle" alt="" />
                                        <span className="fr-user-status busy"></span>
                                    </div>
                                    <div className="fr-request-detail">
                                        <h4>Daniel Mark <span className="task-time pull-right">7 Min Ago</span></h4>
                                        <p>Accept Your Friend Request</p>
                                    </div>
                                </div>
                                <div className="friend-overview">
                                    <div className="friend-overview-img">
                                        <img src="http://via.placeholder.com/500x500" className="img-responsive img-circle" alt="" />
                                        <span className="fr-user-status offline"></span>
                                    </div>
                                    <div className="fr-request-detail">
                                        <h4>Shruti Singh <span className="task-time pull-right">10 Min Ago</span></h4>
                                        <p>Accept Your Friend Request</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane" id="comments">
                            <div className="task">
                                <div className="task-overview">
                                    <div className="alpha-box alpha-a">
                                        <span>A</span>
                                    </div>
                                    <div className="task-detail">
                                        <p>Hello, I am Maryam.</p>
                                        <span className="task-time">2 Min Ago</span>
                                    </div>
                                </div>
                                <div className="task-overview">
                                    <div className="alpha-box alpha-d">
                                        <span>D</span>
                                    </div>
                                    <div className="task-detail">
                                        <p>Hello, I am Maryam.</p>
                                        <span className="task-time">2 Min Ago</span>
                                    </div>
                                </div>
                                <div className="task-overview">
                                    <div className="alpha-box alpha-s">
                                        <span>S</span>
                                    </div>
                                    <div className="task-detail">
                                        <p>Hello, I am Maryam.</p>
                                        <span className="task-time">2 Min Ago</span>
                                    </div>
                                </div>
                                <div className="task-overview">
                                    <div className="alpha-box alpha-h">
                                        <span>H</span>
                                    </div>
                                    <div className="task-detail">
                                        <p>Hello, I am Maryam.</p>
                                        <span className="task-time">2 Min Ago</span>
                                    </div>
                                </div>
                                <div className="task-overview">
                                    <div className="alpha-box alpha-g">
                                        <span>G</span>
                                    </div>
                                    <div className="task-detail">
                                        <p>Hello, I am Maryam.</p>
                                        <span className="task-time">2 Min Ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane" id="freinds">
                            <div className="accept-request">
                                <div className="friend-overview">
                                    <div className="friend-overview-img">
                                        <img src="http://via.placeholder.com/500x500" className="img-responsive img-circle" alt="" />
                                        <span className="fr-user-status online"></span>
                                    </div>
                                    <div className="fr-request-detail">
                                        <h4>Adam Dax <span className="task-time pull-right">Just Now</span></h4>
                                        <p>Accept Your Friend Request</p>
                                    </div>
                                </div>
                                <div className="friend-overview">
                                    <div className="friend-overview-img">
                                        <img src="http://via.placeholder.com/500x500" className="img-responsive img-circle" alt="" />
                                        <span className="fr-user-status offline"></span>
                                    </div>
                                    <div className="fr-request-detail">
                                        <h4>Rita Ray <span className="task-time pull-right">2 Min Ago</span></h4>
                                        <p>Accept Your Friend Request</p>
                                    </div>
                                </div>
                                <div className="friend-overview">
                                    <div className="friend-overview-img">
                                        <img src="http://via.placeholder.com/500x500" className="img-responsive img-circle" alt="" />
                                        <span className="fr-user-status busy"></span>
                                    </div>
                                    <div className="fr-request-detail">
                                        <h4>Daniel Mark <span className="task-time pull-right">7 Min Ago</span></h4>
                                        <p>Accept Your Friend Request</p>
                                    </div>
                                </div>
                                <div className="friend-overview">
                                    <div className="friend-overview-img">
                                        <img src="http://via.placeholder.com/500x500" className="img-responsive img-circle" alt="" />
                                        <span className="fr-user-status offline"></span>
                                    </div>
                                    <div className="fr-request-detail">
                                        <h4>Shruti Singh <span className="task-time pull-right">10 Min Ago</span></h4>
                                        <p>Accept Your Friend Request</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)