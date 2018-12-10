import React, { Component } from 'react'
import PerformanceChart from './performanceChart/performanceChart'
import PortfolioChart from './portfolioChart/portfolioChart';
import OrderList from './orderList/orderList';
import Indicators from './indicators/indicators';
import BalanceChart from './balanceChart/balanceChart';
import moment from 'moment'

export default class PublicDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            performanceChartIndex: 0,
            performanceInfo: [
                {
                    title: '',
                    pairs: []
                }
            ]
        }
        this.mountPerformanceChart = this.mountPerformanceChart.bind(this)
        this.getPerformanceLabels = this.getPerformanceLabels.bind(this)
        this.getPerformanceList = this.getPerformanceList.bind(this)
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
    componentWillMount(){
        const { getPerformanceByPeriod, period, userId} = this.props
        getPerformanceByPeriod(period, userId)
    }
    componentWillReceiveProps(nextProps) {
        let { performanceInfo, performanceLoading } = nextProps
        const { period } = this.props
        const periodArraySize = this.getArrayPeriodSize()
        if (!performanceLoading) {
            if(performanceInfo.length <=0 ){
                performanceInfo =  ([
                    {
                        title: '',
                        pairs: []
                    }
                ])
            }
                
            performanceInfo = performanceInfo
            .sort((a, b) => parseInt(b.title) - parseInt(a.title))
            .map(el => {
                let newPairs = []
                for (let i = 0; i <= periodArraySize; i++) {
                    if (el.pairs[i.toString()]) {
                        if (i > 0)
                            newPairs[i - 1] = el.pairs[i.toString()]
                        else
                            newPairs[0] = el.pairs[i.toString()]
                    } else {
                        if (i > 0) {
                            newPairs[i - 1] = 0
                        }
                        else {
                            newPairs[0] = 0
                        }

                    }
                }
                return ({
                    title: period === 'day' ? 'Week ' + el.title : 'Year ' + el.title,
                    pairs: newPairs
                })
            })
            this.setState({ performanceInfo })
        }

    }
    getArrayPeriodSize() {
        const { period } = this.props
        if (period === 'day') {
            return (7)
        }
        else if (period === 'month')
            return (12)
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
        const { performanceInfo } = this.state
        const seriesData = [{ value: 0 }]
        let period = performanceInfo[this.state.performanceChartIndex].pairs
        for (const key in period) {
            seriesData[key] = {
                value: period[key],
                itemStyle: {
                    color: period[key] >= 0 ? '#0fb76b' : '#f21136'
                }
            }
        }

        const label = this.getPerformanceLabels()
        return (
            {
                xAxis: {
                    type: 'category',
                    data: label.map(l => l.value),
                    axisLabel: {
                        color: '#61869c'
                    }

                },
                yAxis: {
                    type: 'value',
                    axisLine: { show: false },
                    axisLabel: { show: true },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisLabel: {
                        color: '#61869c'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: '{b0}<br /> {c0}%'
                },
                series: [{
                    data: seriesData,
                    type: 'bar'
                }]
            }
        )
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

    mountBalanceChart(){
        let { balanceEvolution } = this.props.balance
        let newBalance = [{}]
        balanceEvolution.forEach(balance => {
            balanceEvolution.forEach(element => {
                if (moment(element.date).isSame(moment(balance.date), 'day'))
                    newBalance.push()
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
                    // label: {
                    //     normal: {
                    //         show: true,
                    //         position: 'top',
                    //         color: '#6a7985'
                    //     },

                    // },
                    color: '#0fb76b'
                }],
            }
        )
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
                <h5 className="ct-title">{p.asset}</h5>
                {
                    !isPublic ?
                        <h5 className="ct-title">{p.amountConvertedToBTC}
                            <span className="ct-designation">
                                Amount in BTC
                    </span>
                        </h5>
                        :
                        null
                }
                {
                    !isPublic ? <h5 className="ct-title">{`${((p.amountConvertedToBTC * 100) / total)
                        .toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`}
                        <span className="ct-designation">
                            Of Total
                    </span>
                    </h5>
                        :
                        <h5 className="ct-title">{`${(p.percent)
                            .toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`}
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
    

    getPerformanceList() {
        let { performanceInfo } = this.state

        return performanceInfo.map((p, i) =>
            <a key={i} onClick={() => this.handlePerformanceChartIndex(i)} className="todo todo-default" href="javascript:void(0)">
                <h5 key={`ct-title${i}`} className="ct-title">{p.title}</h5>
                {

                    p.pairs.map((e, j) =>
                        (<h5 key={j} className={`hidden-mobile ct-title ${e >= 0 ? 'cl-success' : 'cl-danger'}`}>{`${e.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`}
                        </h5>)


                    )
                }
                <span className="ct-title"> = </span>
                <h5 className={`ct-title ${p.pairs.reduce((a, b) => a + b, 0) >= 0 ? ' cl-success' : 'cl-danger'}`}>
                    {`${p.pairs.reduce((a, b) => a + b, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`}
                </h5>

            </a>
        )

    }

    getOrderList() {
        return (this.props.orderList)
    }

    render() {
        const { orderList, balance, balanceFetching, performanceLoading, portfolioLoading } = this.props
        return (
            <div>
                {
                    !balanceFetching? 
                    balance !== 'restrict' ?
                        <div className="col-md-12 col-xs-12">
                            <Indicators
                                balance={balance}
                            />
                        </div> :
                        null:
                        null
                }
                {
                    !balanceFetching? 
                    balance !== 'restrict' ?
                        <div className="col-md-12 col-xs-12">
                            <BalanceChart
                                mountBalanceChart={this.mountBalanceChart}
                            />
                        </div> :
                        null:
                        null
                }

                <div className="col-md-12 col-xs-12" >
                    {
                        performanceLoading ?
                            'LOADING'
                            :
                            <PerformanceChart
                                getCardOptions={this.getCardOptions}
                                mountPerformanceChart={this.mountPerformanceChart}
                                getPerformanceList={this.getPerformanceList}
                            />
                    }


                </div>
                <div className="col-md-12 col-xs-12">
                    {
                        portfolioLoading ?
                            'LOADING'
                            :
                            <PortfolioChart
                                mountPortfolioChart={this.mountPortfolioChart}
                                getPortfolioList={this.getPortfolioList}
                            />
                    }
                </div>
                <div className="col-md-12 col-xs-12">
                    <OrderList
                        orderList={orderList.orderList}
                        isPublic={orderList.isPublic}
                    />
                </div>
            </div>
        )
    }
}


