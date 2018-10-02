import React, { Component } from 'react'
import { login, resetError } from '../authActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import ErrorHandler from "../errorHandler";
import { Link } from "react-router-dom";
import './loginStyle.css'

import Particles from '../../common/effects/particles'

class Login extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = { authError: false }
    }
    onSubmit(values) {
        const { login } = this.props
        login(values)
    }
    componentWillUnmount() {
        const { resetError } = this.props
        resetError()
    }

    componentWillReceiveProps(nextProps) {
        const { userAuthenticated, history, authError } = nextProps
        this.setState({ authError })
        userAuthenticated ?
            history.push("/traderList") :
            null
    }
    componentWillMount() {
        this.props.login()
    }


    render() {
        const { handleSubmit } = this.props
        const { authError } = this.state
        return (
            <div>
               <Particles/>
          
                <div className="col-md-6 col-md-offset-3">                    
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Please Sign In</h3>
                        </div>
                        <div className="panel-body">
                            <img src={require('../../vendor/assets/img/head-logo.png')} className="img-responsive" alt="" />
                            <ErrorHandler error={authError} />
                            <form onSubmit={handleSubmit(v => this.onSubmit(v))}>
                                <fieldset>
                                    <div className="form-group">
                                        <Field type="text" name="email" component="input" className="form-control" placeholder="Email" />
                                    </div>
                                    <div className="form-group">
                                        <Field type="password" name="password" component="input" className="form-control" placeholder="Password" />
                                    </div>
                                    {/* <div className="checkboxs">
                                    <span className="custom-checkbox">
                                        <input type="checkbox" id="checkbox1" name="options[]" />
                                        <label htmlFor="checkbox1"></label>Remember Me
                                    </span>
                                </div> */}
                                    <div className="form-group">
                                        <Link to="/forgotPassword">Forgot password</Link>
                                    </div>
                                    <button type="submit" className="btn btn-login">Login</button>

                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Login = reduxForm({
    form: 'login'
})(Login)

const mapStateToProps = state => {
    return { userAuthenticated: state.auth.userAuthenticated, authError: state.auth.authError }
}

const mapDispatchToProps = dispatch => {
    return (bindActionCreators({ login, resetError }, dispatch))
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
