import React from 'react'
import Tabs from '../../../common/ui/tabs/tabs'

export default props => {
    const {handleScreen, isOwner} = props
    let options
    if(isOwner) {
    options = [
        // {
        //     value: 0,
        //     icon: 'fa fa-comments-o',
        //     text: 'Feed'
        // },
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
    ]} else 
    {
        options = [
            // {
            //     value: 0,
            //     icon: 'fa fa-comments-o',
            //     text: 'Feed'
            // },
            {
                value: 1,
                active: true,
                icon: 'fa fa-bar-chart',
                text: 'Dashboard'
            }            
        ]
    }

    return (
        <Tabs 
            options={options}
            handleActive={handleScreen}/>
    )
}