import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getProfile, setApi } from "./profileActions";
import SimpleUserCard from "../common/ui/simpleUserCard/simpleUserCard";
import Card from '../common/ui/card/card'
import googleAuthImg from '../vendor/assets/img/google-authenticator.png'
import Modal from '../common/ui/modal/modal'
import ContentEditable from 'react-contenteditable'
import { reduxForm, Field } from 'redux-form'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editBig: false
        }
        this.editContent = this.editContent.bind(this)
        this.saveBigDesc = this.saveBigDesc.bind(this)
        this.resetBigDesc = this.resetBigDesc.bind(this)
        this.handleBigDescChange = this.handleBigDescChange.bind(this)
    }
    componentDidMount() {
        const { getProfile } = this.props
        const { editBig } = this.state

        getProfile();
        const { bigDesc, smallDesc } = this.props.profile
        this.setState({ bigDesc, smallDesc })

    }

    componentWillReceiveProps(nextProps) {
        const { bigDesc, smallDesc } = nextProps.profile
        this.setState({ bigDesc, smallDesc })
    }
    componentWillMount() {

    }
    editContent() {
        this.setState({ editBig: true })
    }
    saveBigDesc() {
        this.setState({ editBig: false })
    }
    resetBigDesc() {
        this.setState({ editBig: false, bigDesc: this.props.profile.bigDesc })
    }
    handleBigDescChange(e) {
        this.setState({ bigDesc: e.target.value })
    }
    onSubmit(values) {
        const { setApi } = this.props
        setApi(values)
    }

    render() {
        const { handleSubmit } = this.props
        const { picture, cover, name } = this.props.profile
        const { bigDesc, smallDesc } = this.state

        const { editBig } = this.state
        return (
            <div>
                <div className="col-md-12 col-sm-12">
                    <SimpleUserCard
                        picture={picture}
                        cover={cover}
                        smallDesc={smallDesc}
                        onChange={this.handleBigDescChange}
                        name={name} />
                </div>
                <div className="col-md-4 col-sm-12">
                    <Card title="Configure API Key">
                        <div style={{ textAlign: 'center' }}>
                            <button data-toggle="modal" data-target="#modal-keys" type="button" className="btn btn-success btn-lg">Configure</button>
                        </div>
                    </Card>
                </div>
                <div className="col-md-4 col-sm-12">
                    <Card title="Description" opt={[{ label: 'Edit', func: this.editContent }]} >
                        <ContentEditable
                            ref={(r) => this.bigDescDiv = r}
                            disabled={!editBig}
                            html={bigDesc}
                            onChange={this.handleBigDescChange} />
                        <div>
                            <button type="button"
                                className="btn btn-outline btn-success"
                                style={{
                                    float: 'right', marginTop: '20px',
                                    margin: '5px',
                                    display: editBig ? 'block' : 'none'
                                }}
                                onClick={() => this.saveBigDesc()}>Save
                            </button>
                            <button type="button"
                                className="btn btn-outline btn-danger"
                                style={{
                                    float: 'right', marginTop: '20px',
                                    margin: '5px',
                                    display: editBig ? 'block' : 'none'
                                }}
                                onClick={() => this.resetBigDesc()}>Cancel
                            </button>
                        </div>
                    </Card>
                </div>

                <div className="col-md-4 col-sm-12">
                    <Card title="2 FA">
                        <h3>Soon</h3>
                        <div style={{ textAlign: 'center' }}>
                            <img src={googleAuthImg} style={{ textAlign: 'center', width: '300px' }} />
                        </div>
                    </Card>
                </div>
                <div className="col-md-4 col-sm-12">
                    <Card title="Deposit">
                        <h3>Soon</h3>
                        <div style={{ textAlign: 'center' }}>
                            <button data-toggle="modal"
                                data-target="#modal-keys"
                                type="button" className="btn btn-info btn-lg"
                                disabled>Deposit</button>
                        </div>
                    </Card>
                </div>
                <Modal id="modal-keys">
                    <h3>Exchange API KEY</h3>
                    <form className="contactForm" onSubmit={handleSubmit(v => this.onSubmit(v))}>
                        <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <Field type="text" name="name" component="input" className="form-control" placeholder="Connection Alias" />
                                    </div>
                                    <div className="form-group">
                                        <Field type="password" name="apiKey" component="input" className="form-control" placeholder="API KEY" />
                                    </div>
                                    <div className="form-group">
                                        <Field type="password" name="secretKey" component="input" className="form-control" placeholder="API KEY SECRET" />
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-lg-12 text-center">
                                    <button type="submit" className="btn modal-btn btn-success">Save</button>
                                </div>
                        </div>
                    </form>
                </Modal>
            </div>

        )
    }
}

Profile = reduxForm({
    form: 'profile'
})(Profile)

const mapStateToProps = state => (
    { profile: state.profile.profile }
)

const mapDispatchToProps = dispatch => (
    (bindActionCreators({ getProfile, setApi }, dispatch))
)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)