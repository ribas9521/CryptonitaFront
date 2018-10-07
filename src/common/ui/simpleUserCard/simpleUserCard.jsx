import React from 'react'

export default props => {
    const { picture, cover, smallDesc, name } = props
    return (
        <div className="card simple-card">
            <div className="cardheader" style={{ "background": `url(${cover})` }}>
            </div>
            <div className="avatar">
                <img alt="" src={picture} />
            </div>
            <div className="info">
                <div className="title">
                    <h3>{name}</h3>
                </div>
                <p className="desc">{smallDesc}</p>
            </div>
        </div>
    )
}