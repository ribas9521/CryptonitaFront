import React, { Component } from 'react'
import { resetPassword } from '../authActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import ErrorHandler from "../errorHandler";
import qs from 'query-string'
import SweetAlert from 'sweetalert2-react';


class Reset extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = { authError: false, show: false }
    }
    componentDidMount() {
        const { search } = this.props.location
        const parsed = qs.parse(search)
        this.validationCode = parsed.validationCode


    }
    onSubmit(values) {
        const { resetPassword } = this.props
        resetPassword({ password: values.password, validationCode: this.validationCode })
    }

    componentWillReceiveProps(nextProps) {
        const { authError, resetDone } = nextProps
        this.setState({ authError })
        if(resetDone)
            this.setState({show:true})

    }
    componentWillMount() {

    }


    render() {
        const { handleSubmit, history } = this.props
        const { authError } = this.state
        return (
            <div>                
                <SweetAlert
                    show={this.state.show}
                    title="Password reseted"
                    text="Dont forget your keys again, it's cold outside!"
                    onConfirm={() => { this.setState({ show: false }); history.push("/login") }}
                    type="success"
                />    
                <div className="col-md-6 col-md-offset-3">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Reset Password</h3>
                        </div>
                        <div className="panel-body">
                            <img src={require('../../vendor/assets/img/head-logo.png')} className="img-responsive" alt="" />
                            <ErrorHandler error={authError} />
                            <form onSubmit={handleSubmit(v => this.onSubmit(v))}>
                                <fieldset>
                                    <div className="form-group">
                                        <Field type="password" name="password" component="input" className="form-control" placeholder="New Password" />
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
    return (bindActionCreators({ resetPassword }, dispatch))
}

export default connect(mapStateToProps, mapDispatchToProps)(Reset)
