import React from 'react'
import Card from '../../common/ui/card/card';
import GradientWidget from '../../common/ui/gradientWidget/gradientWidget';
import MiniCard from '../../common/ui/miniCard/miniCard';
import SocialItem from '../../common/ui/socialItem/socialItem';
import { format2Digits, format8Digits, formatTime } from '../../common/helpers/formatValues';
import Indicator from '../../common/ui/indicator/indicator';

const TraderResume = ({ traderResume }) => {
    const { totalFollowingUsers, totalFollowingBTC, performanceBTCAmount,
        performanceBTCPercent, performanceUSDTAmount, performanceUSDTPercent } = traderResume
    return (
        <Card title="Trader Resume">
            <div className="col-xs-12">
                <div className="col-md-6">
                    <GradientWidget icon="fa fa-users" type="success">
                        <h3>{(totalFollowingUsers)}</h3>                       
                        <span>Followers</span>
                    </GradientWidget>
                </div>
                <div className="col-md-6">
                    <GradientWidget icon="fa fa-btc" type="info">
                        <h3>{format8Digits(totalFollowingBTC)}</h3>                       
                        <span>Total BTC</span>
                    </GradientWidget>
                </div>

                {/* <div className="col-xs-6">
                    <Indicator
                        text={'Followers'}
                        value={totalFollowingUsers}
                        type={"purple"}
                        icon={'fa fa-users'}
                    />
                </div>
                <div className="col-xs-6">
                    <Indicator
                        text={'Total BTC'}
                        value={format8Digits(totalFollowingBTC)}
                        currency={'btc'}
                        type={'warning'}
                        icon={'fa fa-btc'}
                    />
                </div> */}
                {/* <div className="col-xs-12">
                    <SocialItem
                        value={format8Digits(copyResultAmountBTC * 0.4)}
                        label="To Pay (40 % of profit)"
                    />
                </div> */}

            </div>
        </Card>
    )
}

export default TraderResume