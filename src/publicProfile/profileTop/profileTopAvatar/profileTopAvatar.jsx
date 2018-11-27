import React from 'react'
import DefaultProfileImage from '../../../vendor/assets/img/generic-profile.png'
import '../../publicProfile.css'

export default props => {
    const { name, totalProfit, lastDayProfit } = props
    return (
        <div className="user-head public-profile">
            <a className="inbox-avatar avatar-image">
                <img width="110" src={DefaultProfileImage} alt="" />
            </a>
            <div className="user-name public-user-name">
                <h5><a>{name}</a></h5>
                <div className="user-card">
                    <div className="bottom">
                        <ul className="social-detail">
                            <li className="return">{totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2,maximumFractionDigits: 2 }) + "%"}<span>Return</span></li>
                            <li className="day-return">{lastDayProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%"}<span>Last Day</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}