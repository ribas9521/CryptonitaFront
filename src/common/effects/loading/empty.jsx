import React from 'react'
import emptyScreen from '../../../vendor/assets/img/emptyScreen.png'

const Empty = props =>{
    const random = Math.floor(Math.random() * 10)
    let msg = 'This is still a desert planet.'
    if(random>=0 && random < 4)
        msg = 'Nothing here yet.'
    else if(random >=4 && random <7)
        msg="Empty like the space..."

    return(
        <div className="col-xs-12" style={{textAlign:'center'}}><br/>
            <h3>{msg}</h3>
            <img src={emptyScreen} 
             width="200px"
            />
        </div>
    )
}

export default Empty 