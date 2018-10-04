import React, { Component } from 'react'
import Indicator from '../../common/ui/indicator/indicator'
import Card from '../../common/ui/card/card'
import ReactEcharts from 'echarts-for-react';

import './clientProfileStyle.css'

const chartOptions = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },

    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        boundaryGap: false,
        splitLine: {
            show: false
        },
        axisLabel:{
            color: '#6a7985'
        }
    },
    yAxis: {
        show:false,
        type: 'value',
        
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {},
        label: {
            normal: {
                show: true,
                position: 'top'
            }
        }
    }],


}
export default class Clientprofile extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { profile } = this.props
        return (
            <div>
                <Indicator
                    text="Return"
                    icon='fa fa-line-chart'
                    value={profile.balance.btc.return}
                    type={profile.balance.btc.return > 0 ? "success" : "danger"}
                    percentage={profile.balance.btc.return}
                    currency="btc" />

                <Indicator
                    text="Available"
                    icon='fa fa-check'
                    value={profile.balance.btc.available}
                    type="info"
                    percentage={profile.balance.availablePercentage}
                    currency="btc" />
                <Indicator
                    text="Alocated"
                    icon='fa fa-plus'
                    value={profile.balance.btc.available}
                    type="warning"
                    percentage={profile.balance.alocatedPercentage}
                    currency="btc" />
                <Indicator
                    text="Total"
                    icon='fa fa-usd'
                    value={profile.balance.btc.totalCapital}
                    type={"success"}
                    percentage={100}
                    currency="btc" />

                <div className="col-md-12 col-sm-12">
                    <Card title="Fund evolution">
                        <ReactEcharts option={chartOptions} style={{margin:" -30px"}}/>
                    </Card>
                </div>


            </div>
        )
    }
}