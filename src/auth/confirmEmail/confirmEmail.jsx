import React, { Component } from 'react'
import qs from 'qs'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { confirmEmail } from '../authActions'
import SweetAlert from 'sweetalert2-react';


export class ConfirmEmail extends Component {
    constructor(props) {
        super(props)
        this.state = { show: true }
    }
    componentDidMount() {
        const { search } = this.props.location
        const parsed = qs.parse(search.substr(1, search.length -1))
        this.props.confirmEmail(parsed)
    }
    

    render() {
        const { emailVerified, history } = this.props       
        return (
            <div>
                <SweetAlert
                    show={this.state.show}
                    title={emailVerified ? "Email validated!": "Something wrong happened"}
                    html={emailVerified ?`Next stop, Moon! <br/> <a href='https://t.me/cryptonitast' target="_blank">Acesse a comunidade no Telegram </a>`: "Please, try again, or contact the mothership: contact@cryptonita.org"}
                    onConfirm={() => { this.setState({ show: false }); history.push("/login") }}
                    type={emailVerified? "success": "error"}
                />
            </div>

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

