import React, { Component } from 'react'
import Indicator from '../../common/ui/indicator/indicator'
import ReactEcharts from 'echarts-for-react';

import './clientProfileStyle.css'

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
                    <div className="card">
                        <div className="card-header">
                            <div className="pull-right">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                        <i className="ti-more"></i>
                                    </button>
                                    <ul className="dropdown-menu pull-right animated flipInX">
                                        <li><a href="#">Edit</a></li>
                                        <li><a href="#">Help</a></li>
                                        <li><a href="#">Settings</a></li>
                                    </ul>
                                </div>
                            </div>
                            <h4 className="card-title m-b-0">Fund evolution</h4>
                        </div>
                        <div className="card-body">
                            <ReactEcharts option={{
                                xAxis: {
                                    type: 'category',
                                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                                },
                                yAxis: {
                                    type: 'value'
                                },
                                series: [{
                                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                                    type: 'line',
                                    areaStyle: {}
                                }]
                            }} />
                        </div>
                    </div>
                </div>

               
            </div>
        )
    }
}