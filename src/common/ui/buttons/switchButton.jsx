import React from 'react'

const SwitchButton = ({ onSwitch, baseCoin,className }) => {
    const checked = baseCoin === 'btc'? true: false
    return (  
            <div className={`onoffswitch ${className}`}>
                <input type="checkbox" onChange={onSwitch} name="onoffswitch" className="onoffswitch-checkbox" id="infowitch" checked={checked} />
                <label className="onoffswitch-label label-info" htmlFor="infowitch">
                    <span className="onoffswitch-inner"></span>
                    <span className="onoffswitch-switch"></span>
                </label>
            </div>

    )
}

export default SwitchButton