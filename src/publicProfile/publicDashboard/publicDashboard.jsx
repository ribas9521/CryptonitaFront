import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getPortfolio, getOrders } from './publicDashboardActions'
import PerformanceChart from './performanceChart/performanceChart'
import PortfolioChart from './portfolioChart/portfolioChart';
import OrderList from './orderList/orderList';

const performanceInfo = [
    [
        { periodTitle: '2018', value: 30, period: 0 }, { value: 45, period: 1 },
        { value: -10, period: 2 }, { value: -30, period: 3 },
        { value: 70, period: 4 }, { value: 110, period: 5 },
        { value: 130, period: 6 }, { value: 150, period: 7 },
        { value: -52, period: 8 }, { value: 22, period: 9 },
        { value: 110, period: 10 }, { value: 130, period: 11 }
    ],
    [
        { periodTitle: '2017', value: 130, period: 0 }, { value: -45, period: 1 },
        { value: -10, period: 2 }, { value: -30, period: 3 },
        { value: 70, period: 4 }, { value: -110, period: 5 },
        { value: 130, period: 6 }, { value: -150, period: 7 },
        { value: -52, period: 8 }, { value: 22, period: 9 },
        { value: 110, period: 10 }, { value: -130, period: 11 }
    ],
    [
        { periodTitle: '2016', value: 30, period: 0 }, { value: 45, period: 1 },
        { value: 10, period: 2 }, { value: -30, period: 3 },
        { value: -70, period: 4 }, { value: 110, period: 5 },
        { value: -130, period: 6 }, { value: 150, period: 7 },
        { value: -52, period: 8 }, { value: 22, period: 9 },
        { value: 110, period: 10 }, { value: 130, period: 11 }
    ],

]

class PublicDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            period: "month",
            performanceChartIndex: 0
        }
        this.mountPerformanceChart = this.mountPerformanceChart.bind(this)
        this.getPerformanceLabels = this.getPerformanceLabels.bind(this)
        this.getPerformanceList = this.getPerformanceList.bind(this)
        this.getPerformanceInfo = this.getPerformanceInfo.bind(this)
        this.handlePerformanceChartIndex = this.handlePerformanceChartIndex.bind(this)
        this.getCardOptions = this.getCardOptions.bind(this)
        this.mountPortfolioChart = this.mountPortfolioChart.bind(this)
        this.getPortfolioList = this.getPortfolioList.bind(this)
        this.getOrderList = this.getOrderList.bind(this)
    }
    getCardOptions() {
        return (
            [{
                func: this.getPerformanceInfo,
                label: 'Monthly',
                param: 'month'
            }, {
                func: this.getPerformanceInfo,
                label: 'Hourly',
                param: 'hour'
            }, {
                func: this.getPerformanceInfo,
                label: 'dayly',
                param: 'day'
            }]
        )
    }
    getPerformanceInfo(period) {
        this.setState({ period })
        return (performanceInfo)
    }
    componentWillMount() {
        const { getPortfolio, getOrders } = this.props
        this.getPerformanceInfo(this.state.period)
        getPortfolio()
        getOrders()
    }
    getPerformanceLabels() {
        const { period } = this.state
        //const { performanceInfo } = this.props
        if (period === "month") {
            return ([
                { value: 'Jan', desc: 'January' }, { value: 'Fev', desc: 'February' }, { value: 'Mar', desc: 'March' },
                { value: 'Apr', desc: 'April' }, { value: 'May', desc: 'May' }, { value: 'Jun', desc: 'June' },
                { value: 'Jul', desc: 'July' }, { value: 'Aug', desc: 'August' }, { value: 'Sep', desc: 'September' },
                { value: 'Oct', desc: 'October' }, { value: 'Nov', desc: 'November' }, { value: 'Dec', desc: 'December' },
            ])
        }
    }
    mountPerformanceChart() {
        //const { performanceInfo } = this.props
        const seriesData = performanceInfo[this.state.performanceChartIndex].map(period => ({
            value: period.value,
            itemStyle: {
                color: period.value > 0 ? '#0fb76b' : '#f21136'
            }
        }))
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
        const total = portfolio.reduce((a, b) => a + b.amountConvertedToBTC, 0)
        return portfolio.map((p, i) =>
            <a key={i} className="todo todo-default" href="javascript:void(0)">
                <div key={`coin-${i}`} className="sm-avater list-avater">
                    <img 
                        src={`https://github.com/atomiclabs/cryptocurrency-icons/blob/master/32/color/${(p.asset).toLowerCase()}.png?raw=true`}
                        className="img-responsive img-circle" alt="" />
                </div>
                <h5 className="ct-title">{p.asset}</h5>
                <h5 className="ct-title">{p.amountConvertedToBTC}
                    <span className="ct-designation">
                        Amount in BTC
                    </span>                
                </h5>
                <h5 className="ct-title">{`${((p.amountConvertedToBTC * 100) / total)
                    .toLocaleString(undefined, { minimumFractionDigits: 2 })}%`}
                    <span className="ct-designation">
                        Of Total
                    </span>                
                </h5>
                
            </a>
        )
    }


    handlePerformanceChartIndex(performanceChartIndex) {
        this.setState({ performanceChartIndex })
    }

    getPerformanceList() {
        //const { performanceInfo } = this.props
        return performanceInfo.map((p, i) =>
            <a key={i} onClick={() => this.handlePerformanceChartIndex(i)} className="todo todo-default" href="javascript:void(0)">
                <h5 key={`ct-title${i}`} className="ct-title">{p[0].periodTitle}</h5>
                {
                    p.map((e, j) =>
                        <h5 key={j} className={`ct-title ${e.value > 0 ? 'cl-success' : 'cl-danger'}`}>{`${e.value}%`}
                        </h5>
                    )
                }
                <span className="ct-title"> = </span>
                <h5 className={`ct-title ${p.reduce((a, b) => a + b.value, 0) > 0 ? ' cl-success' : 'cl-danger'}`}>
                    {`${p.reduce((a, b) => a + b.value, 0)}%`}
                </h5>

            </a>
        )

    }

    getOrderList(){
        return(this.props.orderList)
    }
    render() {
        return (
            <div>
                <div className="col-md-12 col-xs-12" >
                    <PerformanceChart
                        getCardOptions={this.getCardOptions}
                        mountPerformanceChart={this.mountPerformanceChart}
                        getPerformanceList={this.getPerformanceList} />

                </div>
                <div className="col-md-12 col-xs-12">
                    <PortfolioChart
                        mountPortfolioChart={this.mountPortfolioChart}
                        getPortfolioList={this.getPortfolioList} />
                </div>
                <div className="col-md-12 col-xs-12">
                    <OrderList
                        orderList = {this.getOrderList()}
                        />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => (
    {
        portfolio: state.dashboard.portfolio,
        orderList: state.dashboard.orderList
    }
)

const mapDispatchToProps = dispatch => (
    (bindActionCreators({ getPortfolio, getOrders }, dispatch))
)

export default connect(mapStateToProps, mapDispatchToProps)(PublicDashboard)
