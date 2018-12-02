import React, { Component } from 'react'
import { resetPassword, resetResetPassword, resetError } from '../authActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import ErrorHandler from "../errorHandler";
import qs from 'qs'
import SweetAlert from 'sweetalert2-react';
import { password, required, renderField, passwordsMatch } from "../../common/validators/validators";



class Reset extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = { authError: false, show: false }
    }
    componentDidMount() {
        const { search } = this.props.location
        const parsed = qs.parse(search.substr(1, search.length-1))
        this.validationCode = parsed.validationCode


    }
    onSubmit(values) {
        const { resetPassword } = this.props
        resetPassword({ password: values.password, validationCode: this.validationCode })
    }

    componentWillReceiveProps(nextProps) {
        const { authError, resetDone } = nextProps
        this.setState({ authError })
        if (resetDone)
            this.setState({ show: true })
        else
            this.setState({ show: false })

    }
    componentWillUnmount() {
        const { resetResetPassword, resetError } = this.props
        resetResetPassword()
        this.setState({ show: false })
        resetError()
    }


    render() {
        const { handleSubmit, history } = this.props
        const { authError } = this.state
        return (
            <div>
                <SweetAlert
                    show={this.state.show}
                    title="Password reset"
                    text="Dont forget your keys again, it's cold outside!"
                    onConfirm={() => { this.setState({ show: false }); resetResetPassword(); history.push("/login") }}
                    type="success"
                />
                <div className="col-md-6 col-md-offset-3">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Reset Password</h3>
                        </div>
                        <div className="panel-body">
                            <img src={require('../../vendor/assets/img/head-logo.png')} className="img-responsive login-logo" alt="" />
                            <ErrorHandler error={authError} />
                            <form onSubmit={handleSubmit(v => this.onSubmit(v))}>
                                <fieldset>
                                    <div className="form-group">
                                        <Field type="password" name="password" component="input" className="form-control" placeholder="Password" component={renderField} validate={[required, password]} />
                                    </div>
                                    <div className="form-group">
                                        <Field type="password" name="rPassword" component="input" className="form-control" placeholder="Repeat Password" component={renderField} validate={[required, passwordsMatch]} />
                                    </div> 

                                    <button type="submit" className="btn btn-login">Reset</button>

                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Reset = reduxForm({
    form: 'resetPassword'
})(Reset)

const mapStateToProps = state => {
    return { authError: state.auth.authError, resetDone: state.auth.resetDone }
}

const mapDispatchToProps = dispatch => {
    return (bindActionCreators({ resetPassword, resetResetPassword, resetError }, dispatch))
}

export default connect(mapStateToProps, mapDispatchToProps)(Reset)
