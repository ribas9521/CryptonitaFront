import React, { Component } from 'react'
import Card from '../../common/ui/card/card';
import GradientWidget from '../../common/ui/gradientWidget/gradientWidget';
import MiniCard from '../../common/ui/miniCard/miniCard';
import SocialItem from '../../common/ui/socialItem/socialItem';

const Invoice = ({ }) => {
    return (
        <Card title="Current Copy">
            <div className="col-xs-12">
                <div className="col-md-6">
                    <GradientWidget icon="fa fa-btc" type="success">
                        <h3>12%</h3>
                        <h4>0.00230000</h4>
                        <span>Bitcoin Return</span>
                    </GradientWidget>
                </div>
                <div className="col-md-6">
                    <GradientWidget icon="fa fa-usd" type="info">
                        <h3>12%</h3>
                        <h4>$420,00</h4>
                        <span>Dolar Return</span>
                    </GradientWidget>
                </div>

                <div className="col-xs-12">
                    <MiniCard />
                </div>
                <div className="col-xs-12">
                    <SocialItem />
                </div>

            </div>
        </Card>
    )
}

export default Invoice