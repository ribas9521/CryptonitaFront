import React from 'react'

export default props=>{
    return(
        <div className="widget list-widget">
            <div className="row mrg-0">
                <div className="todo-list todo-list-hover todo-list-divided">
                    <a className="todo todo-default" href="#">
                        <span className="ct-title">United states</span>
                        <span className="ct-title">United states</span>
                        <span className="ct-title">United states</span>
                        <span className="badge badge-pill bage-primary">8</span>
                    </a>
                    <a className="todo todo-default" href="#">
                        <span className="ct-title">United Kingdom</span>
                        <span className="badge badge-pill bage-pink">6</span>
                    </a>
                    <a className="todo todo-default" href="#">
                        <span className="ct-title">Austrailia</span>
                        <span className="badge badge-pill bage-success">8</span>
                    </a>
                </div>
            </div>
        </div>
    )
}