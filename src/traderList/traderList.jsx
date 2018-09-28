import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Usercard from './userCard/userCard'
import { getTraders } from "./traderListActions";

export class TraderList extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { getTraders } = this.props
        getTraders()
    }    
    render() {
        const { traderList } = this.props
        const userCards = traderList.map((trader,i)=>{
            return(<Usercard key={i} trader={trader}/>)
        })
        return (
            <div>
                {userCards}
            </div>
        )
        
        
    }

}


const mapStateToProps = state => (
    { traderList: state.traderList.traderList }
)

const mapDispatchToProps = dispatch => (
    (bindActionCreators({ getTraders }, dispatch))
)

export default connect(mapStateToProps, mapDispatchToProps)(TraderList)
