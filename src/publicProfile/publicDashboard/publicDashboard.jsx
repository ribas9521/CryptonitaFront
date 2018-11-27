import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getPortfolio, getOrders, getBalances, getPerformanceByPeriod } from './publicDashboardActions'
import PerformanceChart from './performanceChart/performanceChart'
import PortfolioChart from './portfolioChart/portfolioChart';
import OrderList from './orderList/orderList';
import Indicators from './indicators/indicators';
import { loadState } from '../../common/helpers/localStorage'

// const performanceInfo = [
//     [
//         { periodTitle: '2018', value: 30, period: 0 }, { value: 45, period: 1 },
//         { value: -10, period: 2 }, { value: -30, period: 3 },
//         { value: 70, period: 4 }, { value: 110, period: 5 },
//         { value: 130, period: 6 }, { value: 150, period: 7 },
//         { value: -52, period: 8 }, { value: 22, period: 9 },
//         { value: 110, period: 10 }, { value: 130, period: 11 }
//     ],
//     [
//         { periodTitle: '2017', value: 130, period: 0 }, { value: -45, period: 1 },
//         { value: -10, period: 2 }, { value: -30, period: 3 },
//         { value: 70, period: 4 }, { value: -110, period: 5 },
//         { value: 130, period: 6 }, { value: -150, period: 7 },
//         { value: -52, period: 8 }, { value: 22, period: 9 },
//         { value: 110, period: 10 }, { value: -130, period: 11 }
//     ],
//     [
//         { periodTitle: '2016', value: 30, period: 0 }, { value: 45, period: 1 },
//         { value: 10, period: 2 }, { value: -30, period: 3 },
//         { value: -70, period: 4 }, { value: 110, period: 5 },
//         { value: -130, period: 6 }, { value: 150, period: 7 },
//         { value: -52, period: 8 }, { value: 22, period: 9 },
//         { value: 110, period: 10 }, { value: 130, period: 11 }
//     ],

// ]


class PublicDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            period: "day",
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
        this.getPerformanceInfo = this.getPerformanceInfo.bind(this)
        this.handlePerformanceChartIndex = this.handlePerformanceChartIndex.bind(this)
        this.getCardOptions = this.getCardOptions.bind(this)
        this.mountPortfolioChart = this.mountPortfolioChart.bind(this)
        this.getPortfolioList = this.getPortfolioList.bind(this)
    }
    getCardOptions() {
        return (
            [{
                func: this.getPerformanceInfo,
                label: 'Monthly',
                param: 'month',
                param2: this.props.userId
            }, {
                func: this.getPerformanceInfo,
                label: 'Dayly',
                param: 'day',
                param2: this.props.userId
            }]
        )
    }
    getPerformanceInfo(period, userId ) {
        const { getPerformanceByPeriod } = this.props
        this.setState({ period, performanceChartIndex: 0 })
        getPerformanceByPeriod(period, userId)
    }
    componentWillMount() {
        const { getPortfolio, getOrders, getBalances, userId } = this.props
        this.getPerformanceInfo(this.state.period, userId)
        getPortfolio(userId)
        getOrders(userId)
        getBalances(userId)
    }
    componentWillReceiveProps(nextProps) {
        let { performanceInfo, performanceLoading } = nextProps
        const {period} = this.state       
        const periodArraySize = this.getArrayPeriodSize()
       
            performanceInfo = performanceInfo.map(el => {
                let newPairs = []
                for (let i = 0; i <= periodArraySize; i++) {
                    if (el.pairs[i.toString()]) {
                        if(i > 0)
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
                    title: period === 'day' ? 'Week ' + el.title: 'Year ' + el.title,
                    pairs: newPairs
                })
            })
            this.setState({ performanceInfo })            
        
            
        
       

    }
    getArrayPeriodSize() {
        const { period } = this.state
        if (period === 'day') {
            return (7)
        }
        else if (period === 'month')
            return (12)
    }
    getPerformanceLabels() {
        const { period } = this.state
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
                { value: 'Mon', desc: 'Monday' }, { value: 'Tue', desc: 'Tuesday' }, { value: 'Wed', desc: 'Wednesday' },
                { value: 'Thu', desc: 'Thursday' }, { value: 'Fry', desc: 'Friday' }, { value: 'Sat', desc: 'Saturday' },
                { value: 'Sun', desc: 'Sunday' }
            ])
        }

    }

    mountPerformanceChart() {
        const { performanceInfo } = this.state
        const seriesData = [{value: 0}]
        const period = performanceInfo !== []?
         performanceInfo[this.state.performanceChartIndex].pairs : seriesData
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
        const {assets, isPublic} = portfolio
        const data = assets.map(coin => ({
            value: isPublic? coin.percent: coin.amountConvertedToBTC,
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

    getPortfolioList() {
        const { portfolio } = this.props
        const {assets, isPublic} = portfolio
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
                        .toLocaleString(undefined, { minimumFractionDigits: 2 })}%`}
                        <span className="ct-designation">
                            Of Total
                    </span>
                    </h5> 
                    :
                    <h5 className="ct-title">{`${(p.percent)
                        .toLocaleString(undefined, { minimumFractionDigits: 2 })}%`}
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
    componentWillUnmount(){
        this.handlePerformanceChartIndex(0)
    }

    getPerformanceList() {
        let { performanceInfo } = this.state

        return performanceInfo.map((p, i) =>
            <a key={i} onClick={() => this.handlePerformanceChartIndex(i)} className="todo todo-default" href="javascript:void(0)">
                <h5 key={`ct-title${i}`} className="ct-title">{p.title}</h5>
                {

                    p.pairs.map((e, j) =>
                        (<h5 key={j} className={`hidden-mobile ct-title ${e >= 0 ? 'cl-success' : 'cl-danger'}`}>{`${e.toLocaleString(undefined, { minimumFractionDigits: 2 })}%`}
                        </h5>)


                    )
                }
                <span className="ct-title"> = </span>
                <h5 className={`ct-title ${p.pairs.reduce((a, b) => a + b, 0) >= 0 ? ' cl-success' : 'cl-danger'}`}>
                    {`${p.pairs.reduce((a, b) => a + b, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}%`}
                </h5>

            </a>
        )

    }

    getOrderList() {
        return (this.props.orderList)
    }
   
    render() {
        const { orderList, portfolio, balance } = this.props
        return (
            <div>
                {
                    balance !=='restrict' ? 
                        <div className="col-md-12 col-xs-12">
                            <Indicators
                                balance={balance}
                            />
                        </div>:
                        null
                }
                
                <div className="col-md-12 col-xs-12" >
                    <PerformanceChart
                        getCardOptions={this.getCardOptions}
                        mountPerformanceChart={this.mountPerformanceChart}
                        getPerformanceList={this.getPerformanceList}
                    />

                </div>
                <div className="col-md-12 col-xs-12">
                    <PortfolioChart
                        mountPortfolioChart={this.mountPortfolioChart}
                        getPortfolioList={this.getPortfolioList}
                    />
                </div>
                <div className="col-md-12 col-xs-12">
                    <OrderList
                        orderList={orderList.orderList}
                        isPublic = {orderList.isPublic}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => (
    {
        portfolio: state.publicDashboard.portfolio,
        orderList: state.publicDashboard.orderList,
        balance: state.publicDashboard.balance,
        performanceInfo: state.publicDashboard.performanceInfo,
        performanceLoading: state.publicDashboard.performanceLoading
    }
)

const mapDispatchToProps = dispatch => (
    (bindActionCreators({ getPortfolio, getOrders, getBalances, getPerformanceByPeriod }, dispatch))
)

export default connect(mapStateToProps, mapDispatchToProps)(PublicDashboard)
