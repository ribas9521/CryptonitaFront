import React from 'react'
import ProfileTopAvatart from './profileTopAvatar/profileTopAvatar'
import ProfileTopButtons from './profileTopButtons/profileTopButtons'
import ProfileTopTabs from './profileTopTabs/profileTopTabs'


export default props => {
    const { handleScreen, profile, isOwner, setFollow, setUnfollow, following, userId  } = props
    const { name, totalProfit, lastDayProfit } = profile
    return (
        <div className="mail-box">
            <aside className="sm-side">
                <div className="col-md-12 col-sm-12">
                    <div className="inbox inbox-widget">
                        <div className="row">
                            <div className="col-md-6 col-xs-12">
                                <ProfileTopAvatart
                                    name={name}
                                    totalProfit={totalProfit}
                                    lastDayProfit={lastDayProfit}
                                />
                            </div>
                            {
                                !isOwner ? <div className="col-md-4 col-md-offset-2 col-xs-12 profile-top-buttons">
                                    <ProfileTopButtons
                                        isOwner={isOwner}
                                        setFollow={setFollow}
                                        setUnfollow={setUnfollow}
                                        userId={userId}
                                        following={following} />
                                </div>:null
                            }
                            
                        </div>
                        <div className="row">
                            <ProfileTopTabs isOwner={isOwner} handleScreen={handleScreen} />
                        </div>
                    </div>
                </div >
            </aside>
        </div>

    )
}