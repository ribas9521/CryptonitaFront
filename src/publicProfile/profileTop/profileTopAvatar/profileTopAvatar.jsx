import React, { Component } from 'react'
import DefaultProfileImage from '../../../vendor/assets/img/generic-profile.png'
import '../../publicProfile.css'
import ReactAvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'



export default class ProfileTopAvatar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editMode: false,
        }
        this.getProfileImage = this.getProfileImage.bind(this)
        this.toggleEditMode = this.toggleEditMode.bind(this)
        this.handleDrop = this.handleDrop.bind(this)
    }
    handleDrop(dropped) {
        this.setState({ image: dropped[0] })
    }

    getProfileImage() {
        const { isOwner } = this.props
        const { editMode, image } = this.state
        if (isOwner) {
            if (!editMode) {
                return (<div className="inbox-avatar avatar-image" >
                    {
                        // <a onClick={(e) => { e.preventDefault(); this.toggleEditMode() }} className="edit-can profileTopEdit">
                        //     <i className="fa fa-pencil" aria-hidden="true">
                        //     </i>
                        // </a>
                        <div className="top-box profileTopEdit">
                            <div className="contact-action">
                                <a href="#"
                                    onClick={(e) => { e.preventDefault(); this.toggleEditMode() }}
                                    className="edit-can" style={{ marginLeft: '50px' }}>
                                    <i className="fa fa-pencil" aria-hidden="true"></i></a>
                            </div>
                        </div>
                    }

                    <img width="110" src={DefaultProfileImage} alt="" />
                </div>)
            } else {
                return (
                    <div className=" inbox-avatar dropZone">
                        {
                            !!(image) && <div className="top-box profileTopEdit">
                                <div className="contact-action" style={{ marginRight: "55px" }}>
                                    <a href="#"
                                        onClick={(e) => { e.preventDefault(); this.setState({ image: null }, () => this.toggleEditMode()) }}
                                        className="edit-can " >
                                        <i className="fa fa-trash white-icon" aria-hidden="true"></i></a>
                                    <a href="#"
                                        onClick={(e) => { e.preventDefault(); this.setState({ image: null }, () => this.toggleEditMode()) }}
                                        className="edit-can " >
                                        <i className="fa fa-plus white-icon" aria-hidden="true"></i></a>
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
                                        <ReactAvatarEditor scale={1.1}
                                            width={110} height={110} image={image} />
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                )
            }

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

    render() {
        const { name, totalProfitBTCPercent, isOwner } = this.props
        return (
            <div className="user-head public-profile">
                {
                    this.getProfileImage()
                }



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