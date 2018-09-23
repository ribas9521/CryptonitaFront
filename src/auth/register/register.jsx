import React, { Component } from 'react'
import { signup } from '../authActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'


class Register extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onSubmit(values) {
        const { signup } = this.props
        signup(values)
    }
    componentDidMount() {

    }

    render() {
        const { handleSubmit } = this.props
        return (

            <div className="col-md-6 col-md-offset-3">
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Register</h3>
                    </div>
                    <div className="panel-body">
                        <img src="assets/img/logo.png" className="img-responsive" alt="" />
                        <form onSubmit={handleSubmit(v => this.onSubmit(v))}>
                            <fieldset>
                                <div className="form-group">
                                    <Field type="text" name="name" component="input" className="form-control" placeholder='Your name' />
                                </div>
                                <div className="form-group">
                                    <Field type="password" name="apiKey" component="input" className="form-control" placeholder="Api Key" />
                                </div>
                                <div className="form-group">
                                    <Field type="password" name="secretKey" component="input" className="form-control" placeholder="Api secret Key" />
                                </div>
                                <div className="form-group">
                                    <Field type="email" name="email" component="input" className="form-control" placeholder='name@email.com' />
                                </div>
                                <div className="form-group">
                                    <Field type="password" name="password" component="input" className="form-control" placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    <div className="radio">
                                        <label>
                                            <Field type="radio" id="clientType" name="profileType" className="flat-red" component="input" value={"0"} selected />
                                            Investor
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <Field type="radio" id="traderType" name="profileType" className="flat-red" component="input" value={"1"} selected />
                                            Trader
                                        </label>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-login">Register</button>

                            </fieldset>
                        </form>
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
    return (bindActionCreators({ signup }, dispatch))
}
const mapStateToProps = state => {
    return { userCreated: state.auth.userCreated }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)