import React, { Component } from 'react'
import { login } from '../authActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

class Login extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onSubmit(values) {
        const { login } = this.props
        login(values)
    }
    
    componentWillReceiveProps(nextProps){
        const {userAuthenticated, history} = nextProps
        userAuthenticated ?
            history.push("/mirror") :
            null
    }
    componentWillMount(){
        this.props.login()
    }
    
    render() {
        const { handleSubmit } = this.props
        return (
            <div className="col-md-6 col-md-offset-3">
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Please Sign In</h3>
                    </div>
                    <div className="panel-body">
                        <img src="assets/img/logo.png" className="img-responsive" alt="" />
                        <form onSubmit={handleSubmit(v => this.onSubmit(v))}>
                            <fieldset>
                                <div className="form-group">
                                    <Field type="text" name="email" component="input" className="form-control" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <Field type="password" name="password" component="input" className="form-control" placeholder="Password" />
                                </div>
                                <div className="checkboxs">
                                    <span className="custom-checkbox">
                                        <input type="checkbox" id="checkbox1" name="options[]" />
                                        <label htmlFor="checkbox1"></label>Remember Me
										</span>
                                </div>

                                <button type="submit" className="btn btn-login">Login</button>

                            </fieldset>
                        </form>
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
    return { userAuthenticated: state.auth.userAuthenticated }
}

const mapDispatchToProps = dispatch => {
    return (bindActionCreators({ login }, dispatch))
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
