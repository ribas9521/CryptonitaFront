import React from 'react'

export default props => {
    const { text, onClick, param } = props
    return (
        <div className="card simple-card" style={{ border: "none"}}>
            <a style={{minWidth:"100px"}}
                 href="#" className="btn btn-follow btn-outline btn-success"
                onClick={(e) => { e.preventDefault(); onClick({ usernameId: param})}}>{text}</a>
        </div>
    )
}