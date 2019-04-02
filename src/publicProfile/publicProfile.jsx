import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ProfileTop from './profileTop/profileTop'
import PublicDashboard from './publicDashboard/publicDashboard'
import PublicFeed from './publicFeed/publicFeed'
import './publicProfile.css'
import { login } from '../auth/authActions'
import UserProfile from './userProfile/userProfile';
import { getPublicProfile } from './publicProfileActions'
import { loadState } from '../common/helpers/localStorage'
import { setFollow, setUnfollow, getFollow } from '../traderList/traderListActions'
import { getPerformanceByPeriod, getPortfolio, getOrders, getBalances } from './publicDashboard/publicDashboardActions'


export class PublicProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeScreen: 1,
            period: 'day',
            baseCoin: 'btc'
        }

        this.handleScreen = this.handleScreen.bind(this)
        this.whatToRender = this.whatToRender.bind(this)
        this.isOwner = this.isOwner.bind(this)
        this.isInvestor = this.isInvestor.bind(this)
        this.mountDashBoard = this.mountDashBoard.bind(this)
        this.mountPerformanceChart = this.mountPerformanceChart.bind(this)
        this.mountOrderList = this.mountOrderList.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.onSwitch = this.onSwitch.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.fetchData()
        }
    }

    onSwitch() {
        const { baseCoin } = this.state
        this.setState(baseCoin === 'btc' ? { baseCoin: 'usd' } : { baseCoin: 'btc' })
    }

    componentWillMount() {
        this.fetchData()
    }

    fetchData() {
        const { getPublicProfile, userAuthenticated, login, history } = this.props
        const userId = parseInt(this.props.match.params.id)
        if (userAuthenticated === 'initial') {
            login()
        }
        if (userAuthenticated && !userId) {
            history.push('/publicProfile/' + loadState("identity").username.usernameId)
        }
        if (!userAuthenticated && !userId) {
            history.push('/traderList')
        }

        if ((userId)) {
            this.setState({ userId: parseInt(userId) })
            getPublicProfile(userId)
            getFollow()
            this.mountDashBoard('day', userId)
        }

    }
    handleScreen(activeScreen) {
        this.setState({ activeScreen })
    }

    isOwner() {
        const { userId } = this.state
        const identity = loadState("identity")
        if (identity)
            return parseInt(userId) === parseInt(identity.username.usernameId)
        return false
    }
    isInvestor(){
        const { userId } = this.state
        const { investorList } = this.props
        if(investorList.filter(investor=>investor.usernameId === userId).length > 0)
            return true
        return false        
    }
    mountDashBoard(period = 'day', userId = parseInt(this.state.userId)) {
        this.mountBalanceIndicators(userId)
        this.mountPerformanceChart(period, userId)
        this.mountPortfolioChart(userId)
        this.mountOrderList(userId)
    }
    mountBalanceIndicators(userId) {
        const { getBalances } = this.props
        getBalances(userId)
    }
    mountPerformanceChart(period, userId) {
        const { getPerformanceByPeriod } = this.props
        this.setState({ period })
        getPerformanceByPeriod(period, userId)
    }
    mountPortfolioChart(userId) {
        const { getPortfolio } = this.props
        getPortfolio(userId)
    }
    mountOrderList(userId) {
        const { getOrders } = this.props
        getOrders(userId)
    }

    whatToRender() {
        const { activeScreen, userId, period, baseCoin } = this.state
        const { performanceInfo,
            performanceFetching,
            portfolio,
            portfolioFetching,
            orderList,
            ordersFetching,
            balance,
            balanceFetching } = this.props

        if (activeScreen === 0)
            return <PublicFeed />

        else if (activeScreen === 1){          
            return <PublicDashboard
                userId={userId}
                performanceInfo={performanceInfo}
                performanceFetching={performanceFetching}
                getPerformanceByPeriod={this.mountPerformanceChart}
                period={period}
                portfolio={portfolio}
                portfolioFetching={portfolioFetching}
                orderList={orderList}
                ordersFetching={ordersFetching}
                balance={balance}
                balanceFetching={balanceFetching}
                baseCoin={baseCoin} />
            
        }

        else if (activeScreen === 2)
            return <UserProfile
            />
    }
    render() {
        const { publicProfile, setFollow, setUnfollow, followingList} = this.props
        const { userId, baseCoin } = this.state
        const profileBody = this.whatToRender()
        const isOwner = this.isOwner()
        const isInvestor = this.isInvestor()
        return (
            <div>
                <ProfileTop
                    baseCoin={baseCoin}
                    onSwitch={this.onSwitch}
                    profile={publicProfile}
                    handleScreen={this.handleScreen}
                    userId={userId}
                    isOwner={isOwner}
                    isInvestor={isInvestor}
                    setFollow={setFollow}
                    setUnfollow={setUnfollow}
                    following={followingList.filter((following) => following.usernameId === userId)
                        .length > 0 ? true : false} />

                <div className="profile-body">
                    {
                        profileBody
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => (
    {
        publicProfile: state.publicProfile.profile,
        userAuthenticated: state.auth.userAuthenticated,
        followingList: state.traderList.followingList,
        performanceInfo: state.publicDashboard.performanceInfo,
        performanceFetching: state.publicDashboard.performanceFetching,
        portfolio: state.publicDashboard.portfolio,
        portfolioFetching: state.publicDashboard.portfolioFetching,
        orderList: state.publicDashboard.orderList,
        ordersFetching: state.publicDashboard.ordersFetching,
        balance: state.publicDashboard.balance,
        balanceFetching: state.publicDashboard.balanceFetching,
        investorList: state.traderList.investorList.investors
    }
)

const mapDispatchToProps = dispatch => (
    (bindActionCreators({
        login,
        getPublicProfile,
        setFollow,
        setUnfollow,
        getFollow,
        getPerformanceByPeriod,
        getPortfolio,
        getOrders,
        getBalances
    }, dispatch))
)

export default connect(mapStateToProps, mapDispatchToProps)(PublicProfile)
