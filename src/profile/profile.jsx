import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getProfile, setApi, deleteApi, resetApiRegisterdState } from "./profileActions";
import Card from '../common/ui/card/card'
import googleAuthImg from '../vendor/assets/img/google-authenticator.png'
import Modal from '../common/ui/modal/modal'
import { reduxForm } from 'redux-form'
import genericProfile from '../vendor/assets/img/generic-profile.png'
import { isFirstTime, showTutorial, openTutorial } from "../common/helpers/localStorage";
import ApiKeyModalBody from './apiKeyModalBody'


import './profileStyle.css'

import Tutorial from "../common/ui/tutorial/tutorial";

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isTourOpen: false,
            imageViewer:false,
            isModalOpen: false      
            
        }
     
        this.handleHideModal = this.handleHideModal.bind(this)
        this.handleCloseTutorial = this.handleCloseTutorial.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleOpenTutorial = this.handleOpenTutorial.bind(this)
        this.openTutorial =this.openTutorial.bind(this)
        
       }
   
       
    componentDidMount() {
        const { getProfile, apiKeyRegistered } = this.props
        getProfile();
        this.setState({ apiKeyRegistered })
        
        
    }

    componentWillMount() {
        const { userAuthenticated, history } = this.props
        if (userAuthenticated === 'initial' || userAuthenticated){
            null
        }
        else
            history.push("/login")
        
       
    }
  
    onSubmit(values) {
        const { setApi } = this.props        
        setApi(values)
    }
    closeModal(){
        const { reset } = this.props
        const {apiKeyRegistered, resetApiRegisterdState} = this.props
        if (apiKeyRegistered){
            reset()
            this.handleHideModal()
            resetApiRegisterdState()
        }
            
    }
    handleHideModal(){
        this.setState({isModalOpen: false})
    }
    handleCloseTutorial(){
        this.setState({isTourOpen: false})
    }
    handleOpenTutorial(){
        this.setState({
            isTourOpen: showTutorial() ? true : false
        }, ()=>console.log(this.state.isTourOpen))
    }

    openTutorial(){
        openTutorial()
        this.handleOpenTutorial()
    }
    render() {
        const { handleSubmit, apiKeyList, deleteApi, apiKeyRegistered, apiKeyDeleted, apiKeyError} = this.props
        const {  isModalOpen, isTourOpen } = this.state
       
        this.closeModal()
        return (
            <div>
                <Tutorial startAt={0}  steps={'addApi'} isTourOpen={isTourOpen} onHide={this.handleCloseTutorial}/>
                <div className="col-md-12 col-sm-12">
                    
                </div>
                <div className="col-md-4 col-sm-12">
                    <Card title="Configure API Key">
                        {
                            apiKeyList.name ?
                                <div>
                                    <div className="todo-list todo-browser todo-list-divided">
                                        <a className="todo todo-default">
                                            <span className="ct-title api-span">
                                                <i
                                                    className={apiKeyList.active ? 'fa fa-check' : 'fa fa-times'}></i>
                                                <strong>{apiKeyList.name}</strong>
                                            </span>
                                            <span className="badge bg-danger">
                                                <i className='fa fa-trash'
                                                    onClick={() => deleteApi()}></i>
                                            </span>
                                        </a>
                                    </div>
                                </div> : null}
                        <div className={`btn-api ${isFirstTime() ? `animated infinite pulse` : null}` }>
                            <button data-toggle="modal"
                                data-tut="reactour_addApi"                                
                                type="button" className="btn btn-success "
                                onClick={()=>{
                                    this.handleOpenTutorial()
                                    this.setState({isModalOpen: true})
                                }}
                                >
                                Add or Replace
                                
                                </button>
                        </div>
                    </Card>
                </div>           

                <div className="col-md-4 col-sm-12">
                    <Card title="2 FA - Soon">                  
                        <div style={{ textAlign: 'center' }}>
                            <img src={googleAuthImg} style={{ textAlign: 'center', width: '150px' }} />
                        </div>
                    </Card>
                </div>
               
                <Modal show={isModalOpen} 
                    keyboard={!isTourOpen} 
                    backdrop={!isTourOpen} 
                    onHide={this.handleHideModal}
                   >
                    <ApiKeyModalBody
                        handleSubmit={handleSubmit}
                        onSubmit={this.onSubmit}
                        openTutorial={this.openTutorial}
                    />
                </Modal>
            </div>        
        )
    }
}


Profile = reduxForm({
    form: 'profile'
})(Profile)

const mapStateToProps = state => (
    {
        profile: state.profile.profile,
        apiKeyList: state.profile.apiKeyList,
        apiKeyRegistered: state.profile.apiKeyRegistered,
        userAuthenticated: state.auth.userAuthenticated,
        apiKeyError: state.profile.apiKeyError,
        apiKeyDeleted: state.profile.apiKeyDeleted,
        
    }
)

const mapDispatchToProps = dispatch => (
    (bindActionCreators({ getProfile, setApi, deleteApi, resetApiRegisterdState }, dispatch))
)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)