import React, { Component } from 'react'
import Indicator from '../../common/ui/indicator/indicator'
import Card from '../../common/ui/card/card'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts'
import { roma } from '../../common/ui/echarts/roma'
import moment from 'moment'
import './clientDashboardStyle.css'

export default class ClientDashboard extends Component {
    constructor(props) {
        super(props)
        this.getEvolutionOptions = this.getEvolutionOptions.bind(this)
        this.getPortfolioOptions = this.getPortfolioOptions.bind(this)
        this.getOrderListOptions = this.getOrderListOptions.bind(this)
        echarts.registerTheme('roma', roma)
    }

    getPortfolioOptions() {
        const { portfolio } = this.props
        const data = portfolio.map(coin => ({
            value: coin.amountConvertedToBTC,
            name: coin.asset
        }))
        return ({
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },

            series: [
                {
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: data.sort((a, b) => a.value - b.value),
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        )
    }

    getEvolutionOptions() {
        let { balanceEvolution } = this.props.dashboard
        let newBalance = [{}]
        balanceEvolution.forEach(balance => {
            balanceEvolution.forEach(element => {
                if (moment(element.date).isSame(moment(balance.date), 'day'))
                    newBalance.push()
                //console.log(moment(element.date).isSame(moment(balance.date), 'day'))
            })
        })
        const xAxisData = balanceEvolution.map(period => new Date(period.date).toLocaleTimeString([], { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }))
        const seriesData = balanceEvolution.map(period => period.amountBTC)
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
                    data: xAxisData,
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
                    data: seriesData,
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

    getOrderListOptions() {
        const { orderList } = this.props
        const finalOptions = []
        // orderList.forEach((orderO) => {
        //     let sameOrder = orderList.filter((orderI) => orderO.exchangeOrderId === orderI.exchangeOrderId)
        //         .sort((a, b) => b.usernameExchangeOrderId - a.usernameExchangeOrderId)[0]

        //     finalOptions.push(sameOrder)
        // })
        //return (finalOptions.filter((item, pos) => finalOptions.indexOf(item) == pos))
        return (orderList.filter((order) => order.currentExecutionType !== 'NEW'))
    }

    render() {
        const { dashboard } = this.props
        const evolutionOptions = this.getEvolutionOptions()
        const portfolioOptions = this.getPortfolioOptions()
        const orderList = this.getOrderListOptions()
        return (
            <div>
                <Indicator
                    text="Available"
                    icon='fa fa-check'
                    value={dashboard.totalAvailableBTC.toLocaleString(undefined, { minimumFractionDigits: 8 })}
                    type="info"
                    percentage={0}
                    currency="btc" />
                <Indicator
                    text="Alocated"
                    icon='fa fa-plus'
                    value={dashboard.totalAlocatedBTC.toLocaleString(undefined, { minimumFractionDigits: 8 })}
                    type="warning"
                    percentage={0}
                    currency="btc" />
                <Indicator
                    text="Total"
                    icon='fa fa-usd'
                    value={dashboard.totalAmountBTC.toLocaleString(undefined, { minimumFractionDigits: 8 })}
                    type={"success"}
                    percentage={0}
                    currency="btc" />
                <Indicator
                    text="Return"
                    icon='fa fa-line-chart'
                    value={dashboard.totalReturnBTC.toLocaleString(undefined, { minimumFractionDigits: 8 })}
                    type={dashboard.totalReturnBTC > 0 ? "success" : "danger"}
                    percentage={0}
                    currency="btc" />

                <div className="col-md-12 col-sm-12">
                    <Card title="Fund evolution">
                        <ReactEcharts option={evolutionOptions} style={{ margin: " -20px" }} />
                    </Card>
                </div>
                <div className="col-md-6 col-sm-12">
                    <Card title="Portfolio">
                        <ReactEcharts option={portfolioOptions} theme={"roma"} />

                    </Card>
                </div>
                <div className="col-md-6 col-sm-12" id="tutorial">
                    <Card title="Last Orders">
                        {
                            orderList.map((order, i) =>
                                <div className="row mrg-0" key={"row" + i}>
                                    <div className="todo-list todo-list-hover todo-list-divided">
                                        <div className="todo todo-default">
                                            <div className="sm-avater list-avater">
                                                <img src={`https://github.com/atomiclabs/cryptocurrency-icons/blob/master/32/color/${order.symbol.substr(0, (order.symbol.length - 3)).toLowerCase()}.png?raw=true`} className="img-responsive img-circle" alt="" />
                                            </div>
                                            <h6 className="ct-title">{order.symbol}<span className="ct-designation">{order.side}</span></h6>
                                            <div className="badge badge-action">
                                                <h6 className="ct-title">Price: <span className="ct-designation">{order.lastExecutedPrice.toLocaleString(undefined, { minimumFractionDigits: 8 })}</span></h6>
                                            </div>
                                            <div className="badge badge-action">
                                                <h6 className="ct-title">Quantity: <span className="ct-designation">{order.orderQuantity}</span></h6>
                                            </div>
                                            <div className="badge badge-action">
                                                <h6 className="ct-title">Date: <span className="ct-designation">{new Date(order.createdAt).toLocaleTimeString([], { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</span></h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                        }

                    </Card>
                </div>
            </div>
        )
    }
}