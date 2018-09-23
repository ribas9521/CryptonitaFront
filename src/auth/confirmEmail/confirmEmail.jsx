import React, { Component } from 'react'
import qs from 'query-string'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { confirmEmail } from '../authActions'


export class ConfirmEmail extends Component {
    componentDidMount() {
        const { search } = this.props.location
        const parsed = qs.parse(search)
        this.props.confirmEmail(parsed)

    }

    render() {
        const { emailVerified, history } = this.props
        emailVerified ? history.push("/mirror") : null
        return (
            <h1>Error in email confirmation</h1>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return (bindActionCreators({ confirmEmail }, dispatch))
}
const mapStateToProps = state => {
    return { emailVerified: state.auth.emailVerified }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail)

