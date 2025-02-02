import React from 'react'

export default props => {
    const { options, handleActive } = props
    return (
        <div className="user-box" style={{ padding: "0px" }}>
            <ul className="nav nav-tabs" style={{ margin: "0px" }}>
                {options.map((o, i) =>
                    <li key={`tab${i}`} className={o.active ? "active" : ''}
                    style={{width: 100 / options.length + '%'}}>
                        <a href="#options"
                            data-toggle="tab"
                            aria-expanded="false"
                            onClick={() => handleActive(o.value)}>
                            <i className={o.icon}></i><span className="hidden-mobile"> {o.text}</span></a>
                    </li>
                )}

            </ul>
        </div>
    )
}