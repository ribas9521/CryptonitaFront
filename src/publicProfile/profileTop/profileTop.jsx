import React from 'react'
import ProfileTopAvatart from './profileTopAvatar/profileTopAvatar'
import ProfileTopButtons from './profileTopButtons/profileTopButtons'
import ProfileTopTabs from './profileTopTabs/profileTopTabs'
import SwitchButton from '../../common/ui/buttons/switchButton';
import ProfileTopLoader from '../../common/ui/loaders/profileTopLoader';


export default props => {
    const { handleScreen, profile, isOwner, setFollow, setUnfollow, following, userId, onSwitch, baseCoin, isTrader, profileFetching } = props
    const { name, totalProfitBTCPercent, profitBTC7D } = profile
    return (
        <div className="mail-box">
            <aside className="sm-side">
                <div className="col-md-12 col-sm-12">
                    <div className="inbox inbox-widget">
                        <div className="row">
                            <div className="col-md-6 col-xs-12">
                                {
                                    profileFetching ? <ProfileTopLoader /> :
                                        <ProfileTopAvatart
                                            name={name}
                                            totalProfitBTCPercent={totalProfitBTCPercent}
                                            profitBTC7D={profitBTC7D}
                                            isOwner={isOwner}
                                        //lastDayProfit={lastDayProfit}
                                        />
                                }
                            </div>
                            <div className="col-md-4 col-md-offset-2 col-xs-12 profile-top-buttons">

                            </div>

                            <div className="col-md-4 col-md-offset-2 col-xs-12 profile-top-buttons">
                                {
                                    // isOwner ?
                                    //     <SwitchButton
                                    //         baseCoin={baseCoin}
                                    //         onSwitch={onSwitch}
                                    //         className="baseCoinSwitch" /> :
                                    !isOwner && isTrader ?

                                        <ProfileTopButtons
                                            isOwner={isOwner}
                                            setFollow={setFollow}
                                            setUnfollow={setUnfollow}
                                            userId={userId}
                                            following={following} /> :
                                        null


                                }

                            </div>
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