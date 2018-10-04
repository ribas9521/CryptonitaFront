import React, { Component } from 'react'
import { forgot, resetForgot, resetError } from '../authActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import ErrorHandler from "../errorHandler";
import { Link } from "react-router-dom";
import SweetAlert from 'sweetalert2-react';


class Forgot extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = { authError: false, show: false }
    }
    onSubmit(values) {
        const { forgot } = this.props
        forgot(values)
    }

    componentWillReceiveProps(nextProps) {
        const { authError, forgotSent } = nextProps
        this.setState({ authError })
        if (forgotSent)
            this.setState({ show: true })
        else
            this.setState({ show: false })


    }
    componentWillUnmount(){
        const { resetForgot, resetError } = this.props
        resetForgot()
        resetError()
    }    

    render() {
        const { handleSubmit, history } = this.props
        const { authError } = this.state
        return (
            <div>
                <SweetAlert
                    show={this.state.show}
                    title="Password recovery link sent to your email"
                    text="Calling the nearest spacial locksmith"
                    onConfirm={() => { this.setState({ show: false }); history.push("/login") }}
                    type="success"
                />
                <div className="col-md-6 col-md-offset-3">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Forgot Password</h3>
                        </div>
                        <div className="panel-body">
                            <img src={require('../../vendor/assets/img/head-logo.png')} className="img-responsive" alt="" />
                            <ErrorHandler error={authError} />
                            <form onSubmit={handleSubmit(v => this.onSubmit(v))}>
                                <fieldset>
                                    <div className="form-group">
                                        <Field type="text" name="email" component="input" className="form-control" placeholder="Email" />
                                    </div>

                                    <button type="submit" className="btn btn-login">Enviar</button>

                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Forgot = reduxForm({
    form: 'forgot'
})(Forgot)

const mapStateToProps = state => {
    return { authError: state.auth.authError, forgotSent: state.auth.forgotSent }
}

const mapDispatchToProps = dispatch => {
    return (bindActionCreators({ forgot, resetForgot, resetError }, dispatch))
}

export default connect(mapStateToProps, mapDispatchToProps)(Forgot)
