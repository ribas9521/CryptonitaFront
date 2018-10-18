import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ClientDashboard from './clientDashboard/clientDashboard'
import { getDashboard, getPortfolio } from './dashboardActions'




class Dashboard extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { getDashboard, dashboardError } = this.props
        getDashboard()
        
    }
    componentWillMount() {
        const { userAuthenticated, history } = this.props
        if (userAuthenticated === 'initial' || userAuthenticated) {
            null
        }
        else
            history.push("/login")

    }
    

    render() {
        const { dashboard, portfolio, orderList } = this.props
        return (
            <ClientDashboard dashboard={dashboard} portfolio={portfolio} orderList={orderList}/>
        )
    }

}


const mapStateToProps = state => (
    {
        dashboard: state.dashboard.dashboard,
        portfolio: state.dashboard.portfolio,
        userAuthenticated: state.auth.userAuthenticated,
        orderList: state.dashboard.orderList,
        dashboardError: state.dashboard.dashboardError
    }
)

const mapDispatchToProps = dispatch => (
    (bindActionCreators({ getDashboard, getPortfolio }, dispatch))
)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
