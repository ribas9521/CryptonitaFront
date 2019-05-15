import React from 'react'

const GradientWidget = ({children, icon, type})=>{
    return(
        <div className="widget gradient-widget">
            <div className={`widget-caption gradient-${type}`}>
                <div className={`gradient-icon gr-icon-${type}`}>
                    <i className={icon}></i>
                </div>
                <div className="gradient-detail">
                    <div className="widget-detail">
                    {
                        children
                    }                       
                    </div>
                    {/* <a href="#" className="gr-btn" title="View More">More Info</a> */}
                </div>
            </div>
        </div>
    )
}

export default GradientWidget