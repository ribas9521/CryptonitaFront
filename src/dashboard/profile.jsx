import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ClientProfile from './clientProfile/clientProfile'
import { getProfile } from './profileActions'

class Profile extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { getProfile } = this.props
        getProfile(26)
    }

    render() {
        const { profile } = this.props
        return (
            <ClientProfile profile={profile} />
        )
    }

}


const mapStateToProps = state => (
    { profile: state.profile.profile }
)

const mapDispatchToProps = dispatch => (
    (bindActionCreators({ getProfile }, dispatch))
)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
