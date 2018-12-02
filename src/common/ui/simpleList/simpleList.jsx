import React from 'react'

export default props=>{
    return(
        <div className="widget list-widget">
            <div className="row mrg-0">
                <div className="todo-list todo-list-hover todo-list-divided">
                    {props.children}              
                </div>
            </div>
        </div>
    )
}