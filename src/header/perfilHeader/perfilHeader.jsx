import React from 'react'
import { Link } from 'react-router-dom'
import './perfilHeaderStyle.css'
import genericProfile from '../../vendor/assets/img/generic-profile.png'

const logged = (logout, identity) => (
    <div>
        <span>{identity.username.name}</span>
        <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                <img src={genericProfile} className="img-responsive img-circle" alt="user" />
            </a>
            <ul className="dropdown-menu dropdown-user right-swip">
                <li> <Link to={"/dashboard"}><i className="fa fa-user fa-fw"></i> User Dashboard</Link>
                </li>
                <li><Link to={"/profile"}><i className="fa fa-gear fa-fw"></i> User Profile</Link>
                </li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); logout() }}><i className="fa fa-sign-out fa-fw"></i> Logout</a>
                </li>
            </ul>
        </li>
    </div>
)
const notLogged = (
    <div className="perfilHeaderContainer">
        <button type="button" className="btn btn-outline btn-link">
            <Link to={"/login"}>Login</Link>
        </button>
        <button type="button" className="btn btn-outline btn-link">
            <Link to={"/register"}>Register</Link>
        </button>

    </div>
)
export default props => {
    const toRender = props.userAuthenticated === true ? logged(props.logout, props.identity) : notLogged
    return (
        toRender
    )
}


