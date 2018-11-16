import React from 'react'
import DefaultProfileImage from '../../../vendor/assets/img/generic-profile.png'
import '../../publicProfile.css'

export default props => {
    return (
        <div className="user-head public-profile">
            <a className="inbox-avatar avatar-image">
                <img width="110"  src={DefaultProfileImage} alt="" />
            </a>
            <div className="user-name public-user-name">
                <h5><a>Daniel Duke</a></h5>
                <div className="user-card">
                    <div className="bottom">
                        <ul className="social-detail">
                            <li className="return">13.51%<span>Return</span></li>
                            <li className="day-return">0.29%<span>Last Day</span></li>                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}