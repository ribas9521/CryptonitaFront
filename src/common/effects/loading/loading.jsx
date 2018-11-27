import React from 'react'
import logo from '../../../vendor/assets/img/logo.png'

const Loading = props =>{
    return(
        <img src={logo} className="responsive-img animated infinite rubberBand" width={"20px"} style={{margin:"0px 5px 0px 5px"}}/>
    )
}

export default Loading 