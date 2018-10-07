import React, { Component } from 'react'
import './userCardStyle.css'
import { Sparklines, SparklinesLine } from "react-sparklines";

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
        const { trader } = this.props
        trader.picture = "https://lh3.googleusercontent.com/-TLqKvsqNUCU/WzKdDgWBQsI/AAAAAAAACOU/A9N7wW2jqOcHKyoXlp4DSH80ekchQ0YgwCEwYBhgL/w140-h140-p/31694828_206221469984077_2366797807848783872_n.jpg"
        trader.change24h = 32
        trader.change7d = 25
        trader.change30d=12
        trader.followers = 1200
        trader.totalReturn=90
        trader.size = 79
        trader.description="teste"
        trader.data24h= [10, 29, 13, 35, 65]
        trader.cover = 'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=350'
        return (
            <div className="col-md-4 col-sm-12">
                <div className="card-container manual-flip">
                    <div className="card user-card">
                        <div className="front">
                            <div className="card simple-card user-simple-card">
                                <div className="cardheader" style={{ "background": `url(${trader.cover})` }}>
                                </div>
                                <div className="avatar">
                                    <img alt="" src={trader.picture} />
                                </div>
                                <div className="info">
                                    <div className="title">
                                        <h3>{trader.name}</h3>
                                    </div>
                                    <p className="desc">{`24H: ${trader.change24h}% | 7D: ${trader.change7d}% | 30D: ${trader.change30d}%`}</p>
                                    <a href="#" className="btn btn-follow btn-outline btn-success left-follow">Follow</a>
                                    <a href="#" className="btn btn-follow btn-outline btn-success right-follow"
                                        ref={(turnButton) => this.turnButton = turnButton}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.rotate(this.turnButton)
                                        }}>
                                        <i className="ti-back-right"></i>
                                    </a>

                                </div>
                                <div className="bottom">
                                    <ul className="social-detail">
                                        <li>{trader.followers}<span>Followers</span></li>
                                        <li>{`${trader.totalReturn}%`}<span>Return</span></li>
                                        <li>{`${trader.size}`}<span>Total in BTC</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="back">
                            <div className="content">
                                <div className="main">
                                    <h4 className="text-center">Description</h4>
                                    <p className="text-center">{trader.description}</p>

                                    <div className="stats-container">
                                        <h5 className="text-center">24h Chart</h5>
                                        <Sparklines data={trader.data24h}>
                                        
                                            <SparklinesLine />
                                        </Sparklines>
                                    </div>
                                </div>
                            </div>
                            <div className="footer">
                                <button className="btn btn-simple" rel="tooltip" title="Flip Card" ref={(btn) => this.btn = btn} onClick={() => this.rotate(this.btn)}>
                                    <i className="fa fa-reply"></i> Back
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}