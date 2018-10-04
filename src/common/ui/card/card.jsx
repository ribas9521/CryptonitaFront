import React from 'react'

export default props=>{
    return(
      
            <div className="card">
                <div className="card-header">
                    <div className="pull-right">
                        <div className="btn-group">
                            <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                <i className="ti-more"></i>
                            </button>
                            <ul className="dropdown-menu pull-right animated flipInX">
                                <li><a href="#">Edit</a></li>
                                <li><a href="#">Help</a></li>
                                <li><a href="#">Settings</a></li>
                            </ul>
                        </div>
                    </div>
                    <h4 className="card-title m-b-0">{props.title}</h4>
                </div>
                <div className="card-body">
                    {props.children}
                </div>
            </div>
   
    )
}