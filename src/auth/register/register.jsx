import React, { Component } from 'react'
import { signup, resetError, resetUserCreated } from '../authActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import ErrorHandler from "../errorHandler";
import SweetAlert from 'sweetalert2-react';
import './registerStyle.css'
import { email, password, required, renderField, passwordsMatch } from "../../common/validators/validators";



class Register extends Component {
    constructor(props) {
        super(props)
        this.state = { show: false, authError: false }
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillUnmount(){
        const { resetError } = this.props
        resetError()
        this.setState({ show: false })
        resetUserCreated()
    }
    onSubmit(values) {
        const { signup } = this.props
        signup(values)
    }
    componentWillReceiveProps(nextProps){
        const { userCreated, authError } = nextProps
        this.setState({authError})
        userCreated ? this.setState({ show: true }) : this.setState({ show: false })
    }
    render() {
        const { handleSubmit, history, resetUserCreated } = this.props
        const { authError } = this.state
        return (
            <div>
                <SweetAlert
                    show={this.state.show}
                    title="User created!"
                    text="Please verify your email"
                    onConfirm={() => {this.setState({ show: false }); resetUserCreated(); history.push("/login")}}                
                    type="success"
                />                
            
                <div className="col-md-6 col-md-offset-3">

                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Register</h3>
                        </div>
                        <div className="panel-body">
                            <img src={require('../../vendor/assets/img/head-logo.png')} className="img-responsive" alt="" />
                            <ErrorHandler error={authError} />
                            <form onSubmit={handleSubmit(v => this.onSubmit(v))}>
                                <fieldset>
                                    <div className="form-group">
                                        <Field type="text" name="name" component="input" className="form-control" placeholder='Your name' component={renderField} validate={required}/>
                                    </div>                                   
                                    <div className="form-group">
                                        <Field type="email" name="email" component="input" className="form-control" placeholder='name@email.com' component={renderField} validate={[required, email]} />
                                    </div>
                                    <div className="form-group">
                                        <Field type="password" name="password" component="input" className="form-control" placeholder="Password" component={renderField} validate={[required, password]}/>
                                    </div> 
                                    <div className="form-group">
                                        <Field type="password" name="rPassword" component="input" className="form-control" placeholder="Repeat Password" component={renderField} validate={[required, passwordsMatch]}/>
                                    </div> 

                                    <button type="submit" className="btn btn-login">Register</button>

                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

Register = reduxForm({
    form: 'register'
})(Register)

const mapDispatchToProps = dispatch => {
    return (bindActionCreators({ signup, resetError, resetUserCreated }, dispatch))
}
const mapStateToProps = state => {
    return { userCreated: state.auth.userCreated, authError: state.auth.authError }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)