import React, { Component } from 'react'
import Card from '../../common/ui/card/card';
import GradientWidget from '../../common/ui/gradientWidget/gradientWidget';
import MiniCard from '../../common/ui/miniCard/miniCard';
import SocialItem from '../../common/ui/socialItem/socialItem';
import { format2Digits, format8Digits, formatTime } from '../../common/helpers/formatValues';

const Invoice = ({ investorResume, trader }) => {
    const { createdAt,
        copyResultAmountBTC,
        copyResultPercentBTC,
        copyResultAmountUSDT,
        copyResultPercentUSDT } = investorResume[investorResume.length - 1]
    const { name } = trader
    return (        
        <Card title="Current Copy">
            {
                investorResume[investorResume.length - 1].isActive ? 
                    <div className="col-xs-12">
                        <div className="col-md-6">
                            <GradientWidget icon="fa fa-btc" type="success">
                                <h3>{format2Digits(copyResultPercentBTC)}%</h3>
                                <h4>{format8Digits(copyResultAmountBTC)}</h4>
                                <span>Bitcoin Return</span>
                            </GradientWidget>
                        </div>
                        <div className="col-md-6">
                            <GradientWidget icon="fa fa-usd" type="info">
                                <h3>{format2Digits(copyResultPercentUSDT)}%</h3>
                                <h4>${format2Digits(copyResultAmountUSDT)}</h4>
                                <span>Dolar Return</span>
                            </GradientWidget>
                        </div>

                        <div className="col-xs-12">
                            <MiniCard
                                label={name}
                                subLabel={`Following since: ${formatTime(new Date(createdAt))}`}
                            />
                        </div>
                        <div className="col-xs-12">
                            <SocialItem
                                value={copyResultAmountBTC >0 ? format8Digits(copyResultAmountBTC * 0.4) : format8Digits(0)}
                                label="To Pay (40 % of profit)"
                            />
                        </div>

                    </div>:
                    <h3>No active copies</h3>
            }
           
        </Card>
    )
}

export default Invoice