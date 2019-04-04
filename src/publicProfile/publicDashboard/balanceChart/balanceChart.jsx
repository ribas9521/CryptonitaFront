

import React, { PureComponent } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import Card from '../../../common/ui/card/card';


export default class BalanceChart extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/7j5bbbum/';

    render() {
        return (
            <Card title="Balance Chart" >
                <div style={{ width: '100%', height: 200 }}>
                    <ResponsiveContainer>
                        <AreaChart
                            data={this.props.getData()}
                            margin={{
                                top: 10, right: 30, left: 0, bottom: 0,
                            }}
                        >
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey={this.props.baseCoin} stroke="#8884d8" fill="#8884d8" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        );
    }
}
