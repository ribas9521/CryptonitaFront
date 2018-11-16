import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ProfileTop from './profileTop/profileTop'
import PublicDashboard from './publicDashboard/publicDashboard'
import PublicFeed from './publicFeed/publicFeed'
import './publicProfile.css'

export class PublicProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeScreen: 1
        }
        this.handleScreen = this.handleScreen.bind(this)
        this.whatToRender = this.whatToRender.bind(this)
        this.getBarChart = this.getBarChart.bind(this)
    }
    handleScreen(activeScreen) {
        this.setState({ activeScreen })
    }
    getBarChart() {
        let data = [30, 45, -10, -30, 70, 110, 130, 150, -52, 22, 110, 130].map(i=>({
            value: i,
            itemStyle: {
                color: i > 0 ? '#0fb76b' : '#f21136'
            }
        }))
        return (
            {
                xAxis: {
                    type: 'category',
                    data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                    axisLabel:{
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
                    data: data ,
                    type: 'bar'                   
                }]
            }
        )
    }
    whatToRender() {
        const { activeScreen } = this.state
        if (activeScreen === 0)
            return <PublicFeed />
        else if (activeScreen === 1)
            return <PublicDashboard
                barChart={this.getBarChart()}
            />
        else if (activeScreen === 2)
            return <PublicDashboard />
    }
    render() {
        const profileBody = this.whatToRender()
        return (
            <div>
                <ProfileTop
                    handleScreen={this.handleScreen}
                />
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
        profile: state.profile.profile

    }
)

const mapDispatchToProps = dispatch => (
    (bindActionCreators({}, dispatch))
)

export default connect(null, null)(PublicProfile)
