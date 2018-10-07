import React, { Component } from 'react'
import Indicator from '../../common/ui/indicator/indicator'
import Card from '../../common/ui/card/card'
import ReactEcharts from 'echarts-for-react';

import './clientDashboardStyle.css'


export default class ClientDashboard extends Component {
    constructor(props) {
        super(props)
        this.getChartOptions = this.getChartOptions.bind(this)
    }

    getChartOptions() {
        return (
            {
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
                    axisLabel: {
                        color: '#6a7985'
                    }
                },
                yAxis: {
                    show: false,
                    type: 'value',

                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    areaStyle: {
                        color: '#0fb76b'
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            color: '#6a7985'
                        },
                        
                    },
                    color: '#0fb76b'
                }],


            }
        )
    }
    render() {
        const { dashboard } = this.props
        const options = this.getChartOptions()
        return (
            <div>
                <Indicator
                    text="Return"
                    icon='fa fa-line-chart'
                    value={dashboard.balance.btc.return}
                    type={dashboard.balance.btc.return > 0 ? "success" : "danger"}
                    percentage={dashboard.balance.btc.return}
                    currency="btc" />

                <Indicator
                    text="Available"
                    icon='fa fa-check'
                    value={dashboard.balance.btc.available}
                    type="info"
                    percentage={dashboard.balance.availablePercentage}
                    currency="btc" />
                <Indicator
                    text="Alocated"
                    icon='fa fa-plus'
                    value={dashboard.balance.btc.available}
                    type="warning"
                    percentage={dashboard.balance.alocatedPercentage}
                    currency="btc" />
                <Indicator
                    text="Total"
                    icon='fa fa-usd'
                    value={dashboard.balance.btc.totalCapital}
                    type={"success"}
                    percentage={100}
                    currency="btc" />

                <div className="col-md-12 col-sm-12">
                    <Card title="Fund evolution">
                        <ReactEcharts option={options} style={{ margin: " -30px" }} />
                    </Card>
                </div>
            </div>
        )
    }
}