import React, { Component } from 'react'
import './userCardStyle.css'

export default class UserCard extends Component {
    constructor(props) {
        super(props)
        this.rotate = this.rotate.bind(this)
    }
    componentDidMount() {

    }
    rotate(btn) {
        var $card = $(btn).closest('.card-container');
        if ($card.hasClass('hover')) {
            $card.removeClass('hover');
        } else {
            $card.addClass('hover');
        }
    }

    render() {
        return (
            <div className="col-md-4 col-sm-12">
                <div className="card-container manual-flip">
                    <div className="card user-card">
                        <div className="front">
                            <div className="card simple-card user-simple-card">
                                <div className="cardheader" style={{ "background": "url(https://www.50-best.com/images/badass_facebook_covers/ace_of_spade_badass_cover.jpg)" }}>
                                </div>
                                <div className="avatar">
                                    <img alt="" src="http://live.themezhub.com/live-preview-kavach/kavach/dark/dist/img/avater-1.jpg" />
                                </div>
                                <div className="info">
                                    <div className="title">
                                        <h3>Adam Jimmy</h3>
                                    </div>
                                    <p className="desc">Designer, Developer, Photographer</p>
                                    <a href="#" className="btn btn-follow btn-outline btn-success left-follow">Follow</a>
                                    <a href="#" className="btn btn-follow btn-outline btn-success right-follow"
                                        ref={(turnButton) => this.turnButton = turnButton}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.rotate(this.turnButton)
                                        }}>
                                        <i className="glyphicon glyphicon-hand-right"></i>
                                    </a>

                                </div>
                                <div className="bottom">
                                    <ul className="social-detail">
                                        <li>140<span>Article</span></li>
                                        <li>5782<span>Followers</span></li>
                                        <li>172<span>Following</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="back">
                            <div className="header">
                                <h5 className="motto">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.</h5>
                            </div>
                            <div className="content">
                                <div className="main">
                                    <h4 className="text-center">Job Description</h4>
                                    <p className="text-center">Web design, Adobe Photoshop, HTML5, CSS3, Corel and many others...</p>

                                    <div className="stats-container">
                                        <div className="stats">
                                            <h4>235</h4>
                                            <p>
                                                Followers
															</p>
                                        </div>
                                        <div className="stats">
                                            <h4>114</h4>
                                            <p>
                                                Following
															</p>
                                        </div>
                                        <div className="stats">
                                            <h4>35</h4>
                                            <p>
                                                Projects
															</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="footer">
                                <button className="btn btn-simple" rel="tooltip" title="Flip Card" ref={(btn) => this.btn = btn} onClick={() => this.rotate(this.btn)}>
                                    <i className="fa fa-reply"></i> Back
												</button>
                                <div className="social-links text-center">
                                    <a href="#" className="facebook"><i className="fa fa-facebook fa-fw"></i></a>
                                    <a href="#" className="google"><i className="fa fa-google-plus fa-fw"></i></a>
                                    <a href="#" className="twitter"><i className="fa fa-twitter fa-fw"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}