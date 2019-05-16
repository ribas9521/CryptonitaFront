import React from 'react'
import genericProfile from '../../../vendor/assets/img/generic-profile.png'




const MiniCard = ({ label, subLabel }) => {
    return (
        <div className="card emp-card">
            <div className="row">
                <div className="employee-box employee-box-invoice">
                    <div className="col-xs-5">
                        <div className="emp-avater">
                            <img src={genericProfile} className="img-responsive img-circle" alt="" />
                            <span className="emp-status bg-online"><i className="ti ti-check"></i></span>
                        </div>
                    </div>
                    <div className="left-br col-xs-7">
                        <div className="emp-caption mini-card-right">
                            <h4>{label}</h4>
                            <p className="emp-designation">{subLabel}</p>
                            {/* <div className="emp-flix">
                                    <a href="#"><i className="ti-headphone-alt"></i></a>
                                    <a href="#"><i className="ti-email"></i></a>
                                    <a href="#"><i className="ti-pencil-alt"></i></a>
                                    <a href="#"><i className="ti-trash"></i></a>
                                </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiniCard