import React from 'react'
import Loading from '../../effects/loading/loading';

const LoadingButton=  props=>{
    const { type, className, text, isLoading } = props
    return(
        <button
            type={type}
            className={className}
            disabled={isLoading}>
            {isLoading ? <Loading />:null }
           
            {isLoading ? 'LOADING...':text }            
        </button>
            
    )
}

export default LoadingButton