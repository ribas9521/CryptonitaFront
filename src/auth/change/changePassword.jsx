import React, { Component } from 'react'
import { changePassword, resetChangePassword, resetError } from '../authActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import ErrorHandler from "../errorHandler";
import SweetAlert from 'sweetalert2-react';
import { changePasswordValidator, password, required, renderField, passwordsMatch } from "../../common/validators/validators";



class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = { authError: false, show: false }
    }
    onSubmit(values) {
        const { changePassword } = this.props
        changePassword(values)
    }

    componentWillReceiveProps(nextProps) {
        const { authError, passwordChanged } = nextProps
        this.setState({ authError })
        if (passwordChanged)
            this.setState({ show: true })
        else
            this.setState({ show: false })


    }
    componentWillUnmount() {
        const { resetChangePassword, resetError } = this.props
        resetChangePassword()
        resetError()
    }

    render() {
        const { handleSubmit, history } = this.props
        const { authError } = this.state
        return (
            <div>
                <SweetAlert
                    show={this.state.show}
                    title="Password successfully reset"
                    text="Your meteor shields are up to date!"
                    onConfirm={() => { this.setState({ show: false }); history.push("/login") }}
                    type="success"
                />
                <div className="col-md-6 col-md-offset-3">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Change Password</h3>
                        </div>
                        <div className="panel-body">
                            <img src={require('../../vendor/assets/img/head-logo.png')} className="img-responsive" alt="" />
                            <ErrorHandler error={authError} />
                            <form onSubmit={handleSubmit(v => this.onSubmit(v))}>
                                <fieldset>
                                    <div className="form-group">
                                        <Field type="password" name="currentPassword" component="input" className="form-control" placeholder="Current password" component={renderField} validate={[required]}/>
                                    </div>
                                    <div className="form-group">
                                        <Field type="password" name="newPassword" component="input" className="form-control" placeholder="New Password" component={renderField} validate={[required,password]}/>
                                    </div>
                                    <div className="form-group">
                                        <Field type="password" name="rPassword" component="input" className="form-control" placeholder="Repeat Password" component={renderField} validate={[required, changePasswordValidator]} />
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
ChangePassword = reduxForm({
    form: 'changePassword'
})(ChangePassword)

const mapStateToProps = state => {
    return { authError: state.auth.authError, passwordChanged: state.auth.passwordChanged }
}

const mapDispatchToProps = dispatch => {
    return (bindActionCreators({ changePassword, resetChangePassword, resetError }, dispatch))
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
