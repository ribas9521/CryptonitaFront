import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ProfileTop from './profileTop/profileTop'
import PublicDashboard from './publicDashboard/publicDashboard'
import PublicFeed from './publicFeed/publicFeed'
import './publicProfile.css'
import { login } from '../auth/authActions'
import UserProfile from './userProfile/userProfile';
import { getPublicProfile, getInvestorResume } from './publicProfileActions'
import { loadState } from '../common/helpers/localStorage'
import { setFollow, setUnfollow } from '../traderList/traderListActions'
import { getPortfolio, getBalances } from './publicDashboard/publicDashboardActions'


export class PublicProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeScreen: 1,
            period: 'month',
            baseCoin: 'btc',
        }

        this.handleScreen = this.handleScreen.bind(this)
        this.whatToRender = this.whatToRender.bind(this)
        this.isOwner = this.isOwner.bind(this)
        this.isInvestor = this.isInvestor.bind(this)
        this.mountDashBoard = this.mountDashBoard.bind(this)
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

    componentDidMount() {
        this.fetchData()

    }

    fetchData() {
        const { getPublicProfile, userAuthenticated, login, history, getInvestorResume } = this.props
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
            this.setState({ userId: parseInt(userId) }, () => {
                getPublicProfile(userId)
                this.mountDashBoard(userId)
            })

        }

    }
    handleScreen(activeScreen) {
        this.setState({ activeScreen })
    }

    isOwner(userId) {
        const identity = loadState("identity")
        if (identity) {
            return parseInt(userId) === parseInt(identity.username.usernameId)
        }
        return false
    }
    isInvestor() {
        const { userId } = this.state
        const { investorList } = this.props
        if (investorList.filter(investor => investor.usernameId === userId).length > 0)
            return true
        return false
    }
    mountDashBoard(userId = parseInt(this.state.userId)) {
        this.mountBalanceIndicators(userId)
        this.mountPortfolioChart(userId)
    }
    mountBalanceIndicators(userId) {
        const { getBalances } = this.props
        getBalances(userId)
    }

    mountPortfolioChart(userId) {
        const { getPortfolio } = this.props
        getPortfolio(userId)
    }


    whatToRender() {
        const { activeScreen, userId, period, baseCoin, } = this.state
        const {
            portfolio,
            portfolioFetching,
            balance,
            balanceFetching, investorResume,
            investorResumeFetching, followedTrader,
            followedTraderFetching, publicProfile, traderResume,
            traderResumeFetching } = this.props
        const isOwner = this.isOwner(userId)
        const { isTrader } = publicProfile
        if (activeScreen === 0)
            return <PublicFeed />

        else if (activeScreen === 1) {
            return <PublicDashboard
                userId={userId}
                period={period}
                portfolio={portfolio}
                portfolioFetching={portfolioFetching}
                balance={balance}
                balanceFetching={balanceFetching}
                baseCoin={baseCoin}
                isOwner={isOwner}
                investorResume={investorResume}
                investorResumeFetching={investorResumeFetching}
                followedTrader={followedTrader}
                followedTraderFetching={followedTraderFetching}
                isTrader={isTrader}
                traderResume={traderResume}
                traderResumeFetching={traderResumeFetching}
            />

        }

        else if (activeScreen === 2)
            return <UserProfile
            />
    }
    render() {
        const { publicProfile, setFollow, setUnfollow, userFollowing, profileFetching } = this.props
        const { isFollowing } = publicProfile
        const { userId, baseCoin } = this.state
        const isOwner = this.isOwner(userId)
        const profileBody = this.whatToRender()
        const isTrader = publicProfile && publicProfile.isTrader
        return (
            <div>
                <ProfileTop
                    baseCoin={baseCoin}
                    onSwitch={this.onSwitch}
                    profile={publicProfile}
                    handleScreen={this.handleScreen}
                    userId={userId}
                    isOwner={isOwner}
                    setFollow={setFollow}
                    setUnfollow={setUnfollow}
                    following={userFollowing !== 'initial' ? userFollowing : isFollowing}
                    isTrader={isTrader}
                    profileFetching={profileFetching} />

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
        portfolio: state.publicDashboard.portfolio,
        portfolioFetching: state.publicDashboard.portfolioFetching,
        balance: state.publicDashboard.balance,
        balanceFetching: state.publicDashboard.balanceFetching,
        investorList: state.traderList.investorList.investors,
        userFollowing: state.traderList.userFollowing,
        investorResume: state.publicProfile.investorResume,
        investorResumeFetching: state.publicProfile.investorResumeFetching,
        followedTrader: state.publicProfile.followedTrader,
        followedTraderFetching: state.publicProfile.followedTraderFetching,
        traderResume: state.publicProfile.traderResume,
        traderResumeFetching: state.publicProfile.traderResumeFetching,
        profileFetching: state.publicProfile.profileFetching,


    }
)
const mapDispatchToProps = dispatch => (
    (bindActionCreators({
        login,
        getPublicProfile,
        setFollow,
        setUnfollow,
        getPortfolio,
        getBalances,
        getInvestorResume
    }, dispatch))
)

export default connect(mapStateToProps, mapDispatchToProps)(PublicProfile)
