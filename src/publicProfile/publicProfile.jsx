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
    }
    handleScreen(activeScreen) {
        this.setState({ activeScreen })
    }
   
   
    whatToRender() {
        const { activeScreen } = this.state
        if (activeScreen === 0)
            return <PublicFeed />
        else if (activeScreen === 1)
            return <PublicDashboard/>
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
