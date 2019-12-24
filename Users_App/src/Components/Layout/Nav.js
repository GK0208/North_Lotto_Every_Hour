import React from 'react'
import "../ComponentsStyle.css"
import Spinner from '../Shared/Spinner';

export default function Nav(props) {
    let { activeUser } = props;
    return (
        activeUser ?
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <a className="nav-link " href="/home"><b>Home</b></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/tickets"><b>My_Tickets</b></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/winners"><b>Winners</b></a>
            </li>
            <li className="nav-item">
                <a className="nav-link " href="/createTicket"><b>Create_Ticket</b></a>
            </li>
            <div className="dropdown ">
                <li className="dropbtn ">
                    <b>Profile</b>
                </li>
                <div className="dropdown-content">
                    <a href="/profile">See Profile</a>
                    <a href="/editProfile">Edit Profile</a>
                    <a href="/addCredit">Add Credit</a>
                </div>
            </div>
            <li className="nav-item">
                <a className="nav-link" href="/userBonuses">
                    <b>Bonuses 
                        <span style={{ display: "inline-block", marginLeft: "5px" }} className="notification" >
                            { activeUser.bonuses && activeUser.bonuses.length > 0 ? activeUser.bonuses.length : 0 }
                        </span>
                    </b>
                </a>
            </li>
            <li className="nav-item">
                <span className="nav-link logOut" onClick={()=>props.logOut()}><b>Log out</b></span>
            </li>
            <li className="nav-item">
                <span className="nav-link " ><b>Balance : { activeUser.balance }</b></span>
            </li>
        </ul> 
        :
        <Spinner />
    )
}
