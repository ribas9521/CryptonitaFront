import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Usercard from './userCard/userCard'
import { getTraders, setFollow, setUnfollow } from "./traderListActions";

export class TraderList extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { getTraders } = this.props
        getTraders()
    }    
    render() {
        const { traderList, setFollow, setUnfollow, followingList } = this.props
        const userCards = traderList.traders.map((trader,i)=>{
            return(<Usercard
                 setFollow ={setFollow}
                 setUnfollow={setUnfollow} 
                 key={i} 
                 trader={trader}
                 following={followingList.filter((following)=>following.usernameId === trader.usernameId)
                    .length > 0 ? true: false}/>)
        })
        return (
            <div>
                {userCards}
            </div>
        )
        
        
    }

}


const mapStateToProps = state => (
    { 
        traderList: state.traderList.traderList,
        userFollowing: state.traderList.userFollowing,
        followingList: state.traderList.followingList
    }
)

const mapDispatchToProps = dispatch => (
    (bindActionCreators({ getTraders, setFollow, setUnfollow }, dispatch))
)

export default connect(mapStateToProps, mapDispatchToProps)(TraderList)
