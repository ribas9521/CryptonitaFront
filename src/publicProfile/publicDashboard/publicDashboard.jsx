import React, { Component } from 'react'
import PortfolioChart from './portfolioChart/portfolioChart';
import Indicators from './indicators/indicators';
import BalanceChart from './balanceChart/balanceChart';
import { format2Digits, formatTime, format8Digits, isEmpty } from "../../common/helpers/formatValues";
import Loading from '../../common/effects/loading/loading';
import Card from '../../common/ui/card/card';
import Empty from '../../common/effects/loading/empty';
import Invoice from '../invoice/invoice';
import TraderResume from '../invoice/traderResume';

export default class PublicDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.mountPortfolioChart = this.mountPortfolioChart.bind(this)
        this.getPortfolioList = this.getPortfolioList.bind(this)
        this.handleResume = this.handleResume.bind(this)
    }



    // shouldComponentUpdate(nextProps) {
    //     // const { balanceFetching, portfolioFetching, investorResumeFetching } = nextProps
    //     // if (!balanceFetching && !portfolioFetching && !investorResumeFetching)
    //     //     return true
    //     // else
    //     //     return false
    // }


    mountPortfolioChart() {
        const { portfolio } = this.props
        const { assets, isPublic } = portfolio
        const data = assets.map(coin => ({
            value: isPublic ? coin.percent : coin.balanceInBTC,
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

    // mountBalanceChart() {
    //     let { balanceEvolution } = this.props.balance
    //     return (balanceEvolution.map(b => ({
    //         date: new Date(b.date).toLocaleDateString(),
    //         btc: b.amountBTC,
    //         usd: b.amountUSDT
    //     })))
    // }

    getPortfolioList() {
        const { portfolio } = this.props
        const { assets, isPublic } = portfolio
        const total = assets.reduce((a, b) => a + b.balanceInBTC, 0)
        return (<div className="portfolioList"> {portfolio.assets.map((p, i) =>
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
                        <h5 className="ct-title">{format8Digits(p.balanceInBTC)}
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
        )}</div>)
    }






    handleComponent(cardTitle, obj, fetching, component) {
        const loading = <Card title={cardTitle}>
            <Loading />
        </Card>
        const empty = <Card title={cardTitle}><Empty /></Card>
        if (fetching)
            return loading
        else if (obj.length <= 0 || isEmpty(obj))
            return empty
        else
            return component
    }
    handleResume() {
        const { isOwner, isTrader, traderResume, traderResumeFetching,
            investorResume, investorResumeFetching, followedTrader, followedTraderFetching } = this.props
        if (isOwner) {
            if (isTrader) {
                return (this.handleComponent(
                    "Trader Resume",
                    traderResume,
                    traderResumeFetching,
                    <TraderResume
                        traderResume={traderResume}
                    />
                ))
            }
            else {
                return (this.handleComponent(
                    "Current Copy",
                    investorResume,
                    investorResumeFetching && followedTraderFetching,
                    <Invoice
                        investorResume={investorResume}
                        trader={followedTrader}
                    />
                ))
            }
        }
    }

    render() {
        const { balance, balanceFetching,
            portfolioFetching, portfolio, baseCoin,
        } = this.props
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
                {/* {
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
                } */}


                <div className="col-md-6 col-xs-12">
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

                {
                    this.handleResume()
                }


            </div>
        )
    }
}


