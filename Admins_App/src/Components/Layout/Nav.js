import React from 'react'
import "../ComponentsStyle.css"

export default function Nav(props) {
    return (   
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className="nav-link " href="/home"><b>Home</b></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/sessions"><b>My_Sessions</b></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/startDraw"><b>Start_Draw</b></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/seeAllUsers"><b>Users</b></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/winners"><b>Winners</b></a>
                        </li>
                        <div className="dropdown ">
                        <li className="dropbtn "><b>Profile</b></li>
                        <div className="dropdown-content">
                            <a href="/profile">See Profile</a>
                            <a href="/editProfile">Edit Profile</a>
                        </div>
                        </div>
                        <li className="nav-item">
                            <span className="nav-link logOut" onClick={() => props.logOut()}><b>Log out</b></span>
                        </li>
                    </ul>
    )
}
