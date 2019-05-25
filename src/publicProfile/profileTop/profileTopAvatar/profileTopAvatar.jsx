import React, { Component } from 'react'
import DefaultProfileImage from '../../../vendor/assets/img/generic-profile.png'
import '../../publicProfile.css'
import ReactAvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import Modal from '../../../common/ui/modal/modal'
import LoadingButton from '../../../common/ui/buttons/loadingButton';



export default class ProfileTopAvatar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editMode: false,
            scale: 1.2
        }
        this.getProfileImage = this.getProfileImage.bind(this)
        this.toggleEditMode = this.toggleEditMode.bind(this)
        this.handleDrop = this.handleDrop.bind(this)
        this.handleScale = this.handleScale.bind(this)
        this.saveImage = this.saveImage.bind(this)
    }
    handleDrop(dropped) {
        this.setState({ image: dropped[0] })
    }
    handleScale(e) {
        const { scale } = this.state
        this.setState({ scale: scale + e.deltaY / 1000 <= 1 ? 1 : scale + (e.deltaY / 1000) })
    }

    getProfileImage() {
        const { isOwner } = this.props
        const { editMode, image } = this.state
        if (isOwner) {
            return (<div className="inbox-avatar avatar-image" >
                {
                    
                    // <div className="top-box profileTopEdit">
                    //     <div className="contact-action">
                    //         <a href="#"
                    //             onClick={(e) => { e.preventDefault(); this.toggleEditMode() }}
                    //             className="edit-can" style={{ marginLeft: '50px' }}>
                    //             <i className="fa fa-pencil" aria-hidden="true"></i></a>
                    //     </div>
                    // </div>
                }

                <img width="110" src={DefaultProfileImage} alt="" />
            </div>)
        }
        else {
            return (<a className="inbox-avatar avatar-image" >

                <img width="110" src={DefaultProfileImage} alt="" />
            </a>)
        }
    }

    toggleEditMode() {
        const { editMode } = this.state
        this.setState({ editMode: !editMode })
    }
    saveImage(){
        const canvas = this.crop.getImage().toDataURL()
        console.log(canvas)
    }

    render() {
        const { name, totalProfitBTCPercent, isOwner } = this.props
        const { editMode, image, scale } = this.state
        return (
            <div className="user-head public-profile">
                {
                    this.getProfileImage()
                }
                <Modal show={editMode} onHide={this.toggleEditMode}>
                    <div className="row p-10" style={{ textAlign: 'center' }}>
                        <div className=" inbox-avatar" onWheel={this.handleScale}>
                            {
                                image && <div className="top-box profileTopEdit">
                                    <div className="contact-action">
                                        <a href="#"
                                            onClick={(e) => { e.preventDefault(); this.setState({ image: null }) }}
                                            className="edit-can " style={{ marginLeft: '50px' }}>
                                            <i className="fa fa-trash white-icon" aria-hidden="true"></i></a>
                                    </div>
                                </div>
                            }
                            <Dropzone
                                onDrop={this.handleDrop}
                                disableClick={!!(image)}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <ReactAvatarEditor
                                                ref={(ref) => this.crop = ref}
                                                width={200} height={200} image={image} scale={scale} />
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        </div>
                    </div>
                    <div className="row p-10"  >
                        <LoadingButton
                            text="Enviar"
                            type='submit'
                            className='btn btn-login'
                            onClick={this.saveImage}
                        />
                    </div>
                </Modal>

                <div className="user-name public-user-name">
                    <h5><a>{name}</a></h5>
                    <div className="user-card">
                        <div className="bottom">
                            <ul className="social-detail">
                                <li className="return">{totalProfitBTCPercent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%"}<span>Total Return</span></li>
                                {/* <li className="day-return">{lastDayProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%"}<span>This Cycle</span></li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}