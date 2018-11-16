import React from 'react'
import Tabs from '../../../common/ui/tabs/tabs'

export default props => {
    const {handleScreen} = props
    const options = [
        {
            value: 0,
            icon: 'fa fa-comments-o',
            text: 'Feed'
        },
        {
            value: 1,
            active: true,
            icon: 'fa fa-bar-chart',
            text: 'Dashboard'
        },
        {
            value:2,
            icon: 'fa fa-user',
            text: 'Profile'
        }
    ]
    return (
        <Tabs 
            options={options}
            handleActive={handleScreen}/>
    )
}