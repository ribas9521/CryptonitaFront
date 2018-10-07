import React from 'react'
import { Link } from 'react-router-dom'
import './perfilHeaderStyle.css'

const logged = (logout, identity) => (
    <div>
        <span>{identity.username.name}</span>
        <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/1321.png" className="img-responsive img-circle" alt="user" />
            </a>
            <ul className="dropdown-menu dropdown-user right-swip">
                <li><a href="#"><i className="fa fa-user fa-fw"></i> User Dashboard</a>
                </li>
                <li><a href="#"><i className="fa fa-gear fa-fw"></i> Settings</a>
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
    const toRender = props.userAuthenticated ? logged(props.logout, props.identity) : notLogged
    return (
        toRender
    )
}


