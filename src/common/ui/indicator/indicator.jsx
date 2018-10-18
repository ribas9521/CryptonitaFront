import React from 'react'

export default props => {
    const { icon, value, text, percentage, type, currency} = props
    return (
        <div className="col-md-3 col-sm-6 col-xs-6">
            <div className="widget smart-standard-widget">
                <div className="row">
                    <div className={`widget-caption ${type}`}>
                        <div className="col-xs-4 no-pad">
                            <i className={`icon ${icon}`}></i>
                        </div>
                        <div className="col-xs-8 no-pad">
                            <div className="widget-detail">
                                <h4 className={`cl-${type}`}>{value} <i className={`fa fa-${currency}`}></i></h4>
                                
                                <span>{text}</span>
                            </div>
                        </div>
                        <div className="col-xs-12">
                            <div className={`widget-line bg-info`}>
                                <span style={{ "width": percentage+ "%", position:'relative'}} className={`bg-${type} widget-horigental-line`}></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}