import React from 'react'
import search from '../../../vendor/assets/img/Ufo-icon.png'
import logo from '../../../vendor/assets/img/logo.png'

const Loading = props =>{
    let component = <div className="col-xs-12 animated infinite flash slow" style={{ textAlign: 'center' }}><br />
        <h4>Looking for your data...</h4>
        <img src={search}
            width="200px"
        />
    </div> 
   if(props.button)
       component = <img src={logo} className="responsive-img animated infinite rubberBand" width={"20px"} style={{ margin: "0px 5px 0px 5px" }} />
    return(               
        component
    )
}

export default Loading 