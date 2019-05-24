import React, { Component } from 'react'
import './userCardStyle.css'
import { Sparklines, SparklinesLine } from "react-sparklines";
import genericProfile from  '../../vendor/assets/img/generic-profile.png'
import bgDanger from '../../vendor/assets/img/bg-danger.jpg'
import bgInfo from '../../vendor/assets/img/bg-info.jpg'
import bgPurple from '../../vendor/assets/img/bg-purple.jpg'


export default class UserCard extends Component {
    constructor(props) {
        super(props)
        this.rotate = this.rotate.bind(this)
        this.gotoProfile = this.gotoProfile.bind(this)
    }
    getFollowers(followers){
        if(followers === 0 ){
            return '0'
        } else if( followers  === 1){
            return '$'
        }else if(followers === 2){
            return '$$'
        }
        else return '$$$'
    }
    rotate(btn) {
        var $card = $(btn).closest('.card-container');
        if ($card.hasClass('hover')) {
            $card.removeClass('hover');
        } else {
            $card.addClass('hover');
        }
    }
    gotoProfile(userId){
        const {history} = this.props
        history.push(`/publicProfile/${userId}`)
    }
    getCover(){
        const random = Math.random()
        if(random <= 0.2)
            return bgDanger
        else if(random <= 0.7)
            return bgInfo
        else return bgPurple
    }

    render() {
        const { trader, setFollow, setUnfollow, following } = this.props
        const { usernameId, followers, totalReturnBTCPercent } = trader        
        trader.picture = genericProfile
        const nameArray = trader.name.split(' ')
        trader.description = "teste"
        trader.data24h = [10, 29, 13, 35, 65]
        trader.cover = this.getCover()
        
        return (
            <div className="col-md-4 col-sm-12">
                <div className="card-container manual-flip">
                    <div className="card user-card">
                        <div className="front">
                            <div className="card simple-card user-simple-card">
                                <div onClick={()=>this.gotoProfile(usernameId)} className="cardheader pointer-div" style={{ "background": `url(${trader.cover})` }}>
                                </div>
                                <div onClick={() => this.gotoProfile(usernameId)} className="avatar pointer-div">
                                    <img alt="" src={trader.picture} />
                                </div>
                                <div className="info">
                                    <div onClick={() => this.gotoProfile(usernameId)} className="title pointer-div">
                                        <h3>{nameArray.length >2? `${nameArray[0]} ${nameArray[1]}`: trader.name}</h3>
                                    </div>
                                    <p className="desc"></p>
                                    {/* PARA COLOCAR O BOTAO PARTIDO COLOCAR A CLASSE  left-follow NA TAG <A> ABAIXO */}
                                    <a href="#" 
                                        className={`btn btn-follow btn-outline 
                                            ${following ? 'btn-danger' : 'btn-success ' }`}
                                            onClick={(e) => { e.preventDefault();
                                             following ? setUnfollow() : setFollow({ usernameId }) }}>

                                            {following ? 'Unfollow': 'Follow'}
                                        </a>

                                    {/* {    <a href="#" className="btn btn-follow btn-outline btn-success right-follow"
                                        ref={(turnButton) => this.turnButton = turnButton}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.rotate(this.turnButton)
                                        }}>
                                        <i className="ti-back-right"></i>
                                    </a>} */}
                                

                                </div>
                                <div className="bottom">
                                    <ul className="social-detail">
                                        <li>{this.getFollowers(followers)}<span>Followers</span></li>
                                        <li>{`${totalReturnBTCPercent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`}<span>Total Return</span></li>
                                        {/* <li>{`${0}`}<span>Total in BTC</span></li> */}
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