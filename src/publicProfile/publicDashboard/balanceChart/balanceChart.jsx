

import React, { PureComponent } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush
} from 'recharts';
import Card from '../../../common/ui/card/card';

const toolTipStyle = {
    backgroundColor: '#000',
    opacity: '0.7',
    borderRadius: '5px',
    border: 'none',
    color: '#FFF'
}
const toolTipLabel = {
    color: '#FFF',
    opacity: 1

}

export default class BalanceChart extends PureComponent {
    render() {
        return (
            <Card title="Balance Chart" >
                <div style={{ width: '100%', height: 200}}>
                    <ResponsiveContainer>
                        <AreaChart
                            data={this.props.getData()}
                            margin={{
                                top: 10, right: 30, left: 0, bottom: 0,
                            }}
                        >
                            <defs>
                              
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip
                            isAnimationActive={false} 
                            labelStyle={toolTipLabel}
                            contentStyle={toolTipStyle}/>
                            {/* <Brush dataKey="date" height={30} stroke="#8884d8" /> */}
                            <Area dataKey={this.props.baseCoin} type="monotone" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)"/>
                            
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        );
    }
}
