import React from 'react'
import { Modal } from "react-bootstrap";
import './modalStyle.css'

// export default props =>{
//     const { id, children } = props
//     return (
//         <div data-keyboard={props.dataKeyboard} className="modal modal-box-2 fade" id={id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
//             <div className="modal-dialog">
//                 <div className="modal-content">                   
//                     <div className="modal-body">
//                         {children}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

export default props=>{
    let { children,onHide, show, keyboard, backdrop } = props
    return(
        <Modal show={show} backdrop={backdrop} keyboard={keyboard} onHide={onHide}>                
            <Modal.Body>
                {children}
            </Modal.Body>           
        </Modal>
        
    )
}