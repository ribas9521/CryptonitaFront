import React from 'react'
import './modalStyle.css'

export default props =>{
    const { id, children } = props
    return (
        <div data-keyboard="false" className="modal modal-box-2 fade" id={id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">                   
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}