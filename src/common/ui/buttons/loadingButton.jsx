import React from 'react'
import Loading from '../../effects/loading/loading';

const LoadingButton = props => {
    const { type, className, text, isLoading, onClick } = props
    return (
        <button
            type={type}
            className={className}
            disabled={isLoading}
            onClick={onClick}>
            {isLoading ? <Loading button /> : null}

            {isLoading ? 'LOADING...' : text}
           
        </button>

    )
}

export default LoadingButton