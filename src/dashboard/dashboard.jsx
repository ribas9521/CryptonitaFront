import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ClientDashboard from './clientDashboard/clientDashboard'
import { getDashboard } from './dashboardActions'

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { getDashboard } = this.props
        getDashboard(26)
    }

    render() {
        const { dashboard } = this.props
        return (
            <ClientDashboard dashboard={dashboard} />
        )
    }

}


const mapStateToProps = state => (
    { dashboard: state.dashboard.dashboard }
)

const mapDispatchToProps = dispatch => (
    (bindActionCreators({ getDashboard }, dispatch))
)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
