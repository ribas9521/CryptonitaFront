import React from 'react'
import '../../../'
import qrCode from '../../../vendor/assets/img/qrcode.png'


export const SocialItem =({})=>{
    return(
        <div className="social social-box">
            <div className="social-slick-4">
                <img style={{ display: 'inline-block' }} src={qrCode} width="95" />
                <div style={{ display: 'inline-block', float: 'right' }}>
                    <h3>0.00027898</h3>
                    <span>To Pay</span>
                </div>
            </div>
        </div>
    )
}

export default SocialItem