import React from 'react'
import ProfileTopAvatart from './profileTopAvatar/profileTopAvatar'
import ProfileTopButtons from './profileTopButtons/profileTopButtons'
import ProfileTopTabs from './profileTopTabs/profileTopTabs'


export default props => {
    const {handleScreen} = props
    return (
        <div className="mail-box">
            <aside className="sm-side">
                <div className="col-md-12 col-sm-12">
                    <div className="inbox inbox-widget">
                        <div className="row">
                            <div className="col-md-6 col-xs-12">
                                <ProfileTopAvatart />
                            </div>
                            <div className="col-md-4 col-md-offset-2 col-xs-12 profile-top-buttons">
                                <ProfileTopButtons />
                            </div>
                        </div>
                        <div className="row">
                            <ProfileTopTabs handleScreen = {handleScreen}/>
                        </div>
                    </div>
                </div >
            </aside>
        </div>

    )
}