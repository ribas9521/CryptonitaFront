import React from 'react'
import RoundButton from '../../../common/ui/buttons/roundButton'

export default props => {
    const {setFollow, setUnfollow, userId, following} = props
    return (
        <div>
            <div className="col-md-6 col-xs-6" style={{float:'right'}}>
                <RoundButton 
                    text={following? 'Unfollow': 'Follow'} 
                    onClick = {following? setUnfollow : setFollow}
                    param = {userId}/>
            </div>
            {/* <div className="col-md-6 col-xs-6">
                <RoundButton text="Follow" />
            </div> */}
        </div>
    )
}