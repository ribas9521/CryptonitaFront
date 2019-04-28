import React, { Component } from 'react'
import PerformanceChart from './performanceChart/performanceChart'
import PortfolioChart from './portfolioChart/portfolioChart';
import OrderList from './orderList/orderList';
import Indicators from './indicators/indicators';
import BalanceChart from './balanceChart/balanceChart';
import { format2Digits, formatTime, format8Digits } from "../../common/helpers/formatValues";
import Loading from '../../common/effects/loading/loading';
import Card from '../../common/ui/card/card';
import Empty from '../../common/effects/loading/empty';

export default class PublicDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            performanceChartIndex: 0,

        }
        this.mountPerformanceChart = this.mountPerformanceChart.bind(this)
        this.getPerformanceLabels = this.getPerformanceLabels.bind(this)
        this.handlePerformanceChartIndex = this.handlePerformanceChartIndex.bind(this)
        this.getCardOptions = this.getCardOptions.bind(this)
        this.mountPortfolioChart = this.mountPortfolioChart.bind(this)
        this.getPortfolioList = this.getPortfolioList.bind(this)
        this.handlePeriodChange = this.handlePeriodChange.bind(this)
        this.mountBalanceChart = this.mountBalanceChart.bind(this)
    }
    getCardOptions() {
        const { userId } = this.props
        return (
            [{
                func: this.handlePeriodChange,
                label: 'Monthly',
                param: 'month',
                param2: userId
            }, {
                func: this.handlePeriodChange,
                label: 'Daily',
                param: 'day',
                param2: userId
            }]
        )
    }
    handlePeriodChange(period, userId) {
        const { getPerformanceByPeriod } = this.props
        this.setState({ performanceChartIndex: 0 })
        getPerformanceByPeriod(period, userId)
    }

    shouldComponentUpdate(nextProps) {
        const { balanceFetching, ordersFetching, portfolioFetching } = nextProps
        if (!balanceFetching && !ordersFetching && !portfolioFetching)
            return true
        else
            return false
    }


    getPerformanceLabels() {
        const { period } = this.props
        if (period === "month") {
            return ([
                { value: 'Jan', desc: 'January' }, { value: 'Fev', desc: 'February' }, { value: 'Mar', desc: 'March' },
                { value: 'Apr', desc: 'April' }, { value: 'May', desc: 'May' }, { value: 'Jun', desc: 'June' },
                { value: 'Jul', desc: 'July' }, { value: 'Aug', desc: 'August' }, { value: 'Sep', desc: 'September' },
                { value: 'Oct', desc: 'October' }, { value: 'Nov', desc: 'November' }, { value: 'Dec', desc: 'December' },
            ])

        }
        else if (period === "day") {
            return ([
                { value: 'Sun', desc: 'Sunday' },
                { value: 'Mon', desc: 'Monday' }, { value: 'Tue', desc: 'Tuesday' }, { value: 'Wed', desc: 'Wednesday' },
                { value: 'Thu', desc: 'Thursday' }, { value: 'Fry', desc: 'Friday' }, { value: 'Sat', desc: 'Saturday' },

            ])
        }

    }

    mountPerformanceChart() {
        let { performanceInfo } = this.props
        performanceInfo = performanceInfo[performanceInfo.length]
        const labels = this.getPerformanceLabels()
        const performance = []
        if (performanceInfo)
            for (let i = 0; i < 12; i++) {
                performance.push({ month: labels[i].value, value: performanceInfo.pairs[i] || 0 })
            }
        console.log(performance)

        return performance
    }
    mountPortfolioChart() {
        const { portfolio } = this.props
        const { assets, isPublic } = portfolio
        const data = assets.map(coin => ({
            value: isPublic ? coin.percent : coin.amountConvertedToBTC,
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
                    center: ['50%', '55%'],
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

    mountBalanceChart() {
        let { balanceEvolution } = this.props.balance
        return (balanceEvolution.map(b => ({
            date: new Date(b.date).toLocaleDateString(),
            btc: b.amountBTC,
            usd: b.amountUSDT
        })))
    }

    getPortfolioList() {
        const { portfolio } = this.props
        const { assets, isPublic } = portfolio
        const total = assets.reduce((a, b) => a + b.amountConvertedToBTC, 0)
        return portfolio.assets.map((p, i) =>
            <a key={i} className="todo todo-default" href="javascript:void(0)">
                <div key={`coin-${i}`} className="sm-avater list-avater">
                    <img
                        src={`https://github.com/atomiclabs/cryptocurrency-icons/blob/master/32/color/${(p.asset).toLowerCase()}.png?raw=true`}
                        className="img-responsive img-circle" alt="" />
                </div>
                <h5 className="ct-title">{p.asset}
                    <span className="ct-designation">{`${format8Digits(p.amountFree)}`}</span></h5>

                {
                    !isPublic ?
                        <h5 className="ct-title">{format8Digits(p.amountConvertedToBTC)}
                            <span className="ct-designation">
                                in BTC
                    </span>
                        </h5>
                        :
                        null
                }
                {
                    isPublic &&

                    <h5 className="ct-title">{`${format2Digits(p.percent)}%`}
                        <span className="ct-designation">
                            Of Total
                        </span>
                    </h5>
                }


            </a>
        )
    }


    handlePerformanceChartIndex(performanceChartIndex) {
        this.setState({ performanceChartIndex })
    }




    getOrderList() {
        return (this.props.orderList)
    }

    handleComponent(cardTitle, obj, fetching, component) {
        const loading = <Card title={cardTitle}>
            <Loading />
        </Card>
        const empty = <Card title={cardTitle}><Empty /></Card>
        if (fetching)
            return loading
        else if (obj.length <= 0)
            return empty
        else
            return component
    }

    render() {
        const { orderList, balance, balanceFetching, performanceFetching,
            portfolioFetching, ordersFetching, performanceInfo, portfolio, baseCoin } = this.props
        return (
            <div>
                {
                    !balanceFetching ?
                        balance !== 'restrict' ?
                            <div className="col-md-12 col-xs-12">
                                <Indicators
                                    balance={balance}
                                    baseCoin={baseCoin}
                                />
                            </div> :
                            null :
                        null
                }
                {
                    !balanceFetching ?
                        balance !== 'restrict' ?
                            <div className="col-md-12 col-xs-12">
                                <BalanceChart
                                    getData={this.mountBalanceChart}
                                    baseCoin={this.props.baseCoin}
                                />
                            </div> :
                            null :
                        null
                }

                {/* <div className="col-md-12 col-xs-12" >
                    {
                        this.handleComponent(
                            "Performance",
                            performanceInfo,
                            performanceFetching,
                            <PerformanceChart
                                getCardOptions={this.getCardOptions}
                                data={this.mountPerformanceChart()}
                                getPerformanceList={this.getPerformanceList}
                            />
                        )
                    }


                </div> */}
                <div className="col-md-12 col-xs-12">
                    {
                        this.handleComponent(
                            "Portfolio",
                            portfolio.assets,
                            portfolioFetching,
                            <PortfolioChart
                                mountPortfolioChart={this.mountPortfolioChart}
                                getPortfolioList={this.getPortfolioList}
                            />
                        )
                    }
                </div>
                <div className="col-md-12 col-xs-12">
                    {
                        this.handleComponent(
                            "Orders",
                            orderList.orderList,
                            ordersFetching,
                            <OrderList
                                orderList={orderList.orderList}
                                isPublic={orderList.isPublic}
                            />
                        )

                    }

                </div>
            </div>
        )
    }
}


