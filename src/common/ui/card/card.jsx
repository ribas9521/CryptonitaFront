import React from 'react'

export default props => {
    const { children, opt } = props
    return (
        <div className="card">
            <div className="card-header">
                {
                    opt ?
                        <div className="pull-right">
                            <div className="btn-group">
                                <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                    <i className="ti-more"></i>
                                </button>
                                <ul className="dropdown-menu pull-right">
                                    {
                                        opt.map((o, i) =>
                                            <li key={`opt${i}`}>
                                                <a href="#"
                                                    onClick={
                                                        (e) => { e.preventDefault(); o.func(o.param ? o.param: null, o.param2 ? o.param2:null) }}>
                                                    {o.label}
                                                </a>
                                            </li>
                                        )
                                    }

                                </ul>
                            </div>
                        </div> : null
                }

                <h4 className="card-title m-b-0">{props.title}</h4>
            </div>
            <div className="card-body">
                {children}
            </div>
        </div>

    )
}