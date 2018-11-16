import React from 'react'
import RoundButton from '../../../common/ui/buttons/roundButton'

export default props => {
    return (
        <div>
            <div className="col-md-6 col-xs-6">
                <RoundButton text="Copy" />
            </div>
            <div className="col-md-6 col-xs-6">
                <RoundButton text="Follow" />
            </div>
        </div>
    )
}