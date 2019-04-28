// import React from 'react'
// import ReactEcharts from 'echarts-for-react';
// import Card from '../../../common/ui/card/card'
// import SimpleList from '../../../common/ui/simpleList/simpleList'

// export default props=>{
//     const { getCardOptions, mountPerformanceChart, getPerformanceList } = props
//     return(
//         <Card title="Performance" opt={getCardOptions() || []} >
//             <ReactEcharts
//                 option={mountPerformanceChart() || {}}>
//             </ReactEcharts>
//             {/* <SimpleList className="performance-list">
//                 {getPerformanceList()}
//             </SimpleList> */}
//         </Card>
//     )
// }

import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer
} from 'recharts';
import Card from '../../../common/ui/card/card';


export default class Example extends PureComponent {
    render() {
        const { data } = this.props
        return (
            <Card title="Balance Chart" >
                <div style={{ width: '100%', height: 350 }}>
                    <ResponsiveContainer>
                        <BarChart
                            width={500}
                            height={500}
                            data={data}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <ReferenceLine y={0} stroke="#000" />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        );
    }
}
