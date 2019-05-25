import React from 'react'
import IndicatorLoader from '../loaders/indicatorLoader';

export default props => {
    const { icon, value, text, percentage, type, currency, fetching } = props
    return (

        <div className="widget smart-standard-widget">
            <div className="row">
                {
                    fetching ? <IndicatorLoader/> :

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
                            {/* <div className="col-xs-12">
                            <div className={`widget-line bg-info`}>
                                <span style={{ "width": percentage+ "%", position:'relative'}} className={`bg-${type} widget-horigental-line`}></span>
                            </div>
                        </div> */}
                        </div>

                }

            </div>
        </div>
    )
}