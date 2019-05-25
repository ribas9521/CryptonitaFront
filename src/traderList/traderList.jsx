import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Usercard from './userCard/userCard'
import { getTraders, setFollow, setUnfollow, resetUserFollowing } from "./traderListActions";
import Loading from '../common/effects/loading/loading';

export class TraderList extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { getTraders } = this.props
        getTraders()
    }
    componentWillUnmount() {
        const { resetUserFollowing } = this.props
        resetUserFollowing()

    }
    getSpecial(usernameId) {
        const { traderList } = this.props
        const { traders } = traderList
        let greater = 0
        let resultTrader = 0 
        for (let trader of traders) {
            if (trader.totalReturnBTCPercent > greater) {
                greater = trader.totalReturnBTCPercent
                resultTrader = trader.usernameId
            }

        }
        return(resultTrader === usernameId)
    }
    render() {
        const { traderList, setFollow, setUnfollow, history, userFollowing, traderListFetching } = this.props
        const userCards = traderList.traders.sort((a, b) => b.totalReturnBTCPercent - a.totalReturnBTCPercent)
            .map((trader, i) => {
                return (<Usercard
                    history={history}
                    setFollow={setFollow}
                    setUnfollow={setUnfollow}
                    key={i}
                    special={this.getSpecial(trader.usernameId)}
                    trader={trader}
                    following={userFollowing !== 'initial' ? userFollowing === trader.usernameId : trader.isFollowing} />)
            })
        return (
            <div>
                {traderListFetching ? <Loading /> : userCards}
            </div>
        )


    }

}


const mapStateToProps = state => (
    {
        traderList: state.traderList.traderList,
        traderListFetching: state.traderList.traderListFetching,
        userFollowing: state.traderList.userFollowing,
    }
)

const mapDispatchToProps = dispatch => (
    (bindActionCreators({ getTraders, setFollow, setUnfollow, resetUserFollowing }, dispatch))
)

export default connect(mapStateToProps, mapDispatchToProps)(TraderList)
