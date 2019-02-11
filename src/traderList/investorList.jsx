import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getInvestors } from "./traderListActions";
import InvestorCard from './investorCard/investorCard';

export class InvestorList extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { getInvestors } = this.props
        getInvestors()
    }
    render() {
        const { investorList, history } = this.props
        const investorCards = investorList.investors.sort((a, b) => b.totalReturnPercent - a.totalReturnPercent)
            .map((investor, i) => {
                return (<InvestorCard
                    history={history}                   
                    key={i}
                    investor={investor}
                     />)
            })
        return (
            <div>
                {investorCards }
            </div>
        )


    }

}


const mapStateToProps = state => (
    {
        investorList: state.traderList.investorList      
    }
)

const mapDispatchToProps = dispatch => (
    (bindActionCreators({ getInvestors }, dispatch))
)

export default connect(mapStateToProps, mapDispatchToProps)(InvestorList)
