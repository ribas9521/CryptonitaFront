import React from 'react'
import {Link} from 'react-router-dom'

const handleError = error =>{    
    if (error === 'MSG_INVALID_CREDENTIALS'){
        return <div>Invalid email or password <Link to="/forgotpassword" className="alert-link">Forgot your password?</Link></div>
    }
    else if (error ==='MSG_INVALID_PARAMETERS' )
        return <div>Ivalid parameters</div>
    else if (error ==='MSG_REGISTER_EMPTY_EMAIL' )
        return <div>Empty email field</div>
    else if (error ==='MSG_REGISTER_EMPTY_PASSWORD' )
        return <div>Empty password field</div>
    else if (error ==='MSG_REGISTER_EMPTY_NAME' )
        return <div>Empty name field</div>
    else if (error ==='MSG_REGISTER_EMAIL_IN_USE' )
        return <div>Email already registered</div>
    else if (error ==='MSG_REGISTER_EMPTY_APIKEY' )
        return <div>Empty API key field</div>
    else if (error ==='MSG_REGISTER_EMPTY_FIELDS' )
        return <div>Empty fields</div>
    else{
        return <div>{error}</div>
    }
    
}
export default props=>(
    props.error? 
    <div className="alert alert-danger" style={{textAlign:'center'}}>
       {handleError(props.error)}      
    </div>:null
)