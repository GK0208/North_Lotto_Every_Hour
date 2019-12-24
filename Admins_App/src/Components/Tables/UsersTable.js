import React from 'react'
import {  FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

export default function UsersTable(props) {
    const users = props.users;
    return (
        <table className="table table-striped winnerTable" style={{width:"90%",marginLeft:"5%"}}>
        <thead>
            <tr>
            <th scope="col">Username </th>
            <th scope="col">Gender </th>
            <th scope="col">Date of birth </th>
            <th scope="col">Card Number </th>
            <th scope="col">Total tickets </th>
            <th scope="col">City </th>
            <th scope="col">State </th>
            <th scope="col">Balance </th>
            <th scope="col">IsSubscribed </th>
            <th scope="col">Admin Permision </th>
            </tr>
        </thead>
        <tbody>
             {users.map((user,index) =>{return(
                <tr key={index}>
                    <td>{user.userName}</td>
                    <td>{user.gender !== "Undifined" ? user.gender : "N/A"}</td>
                    <td>{user.dateOfBirth ? user.dateOfBirth.substring(0,user.dateOfBirth.indexOf("T")) : "N/A"}</td>
                    <td>{user.cardNumber}</td>
                    <td>{user.ticketsLength}</td>
                    <td>{user.city ? user.city : "N/A"}</td>
                    <td>{user.state ? user.state : "N/A"}</td>
                    <td>{user.balance}</td>
                    <td>{user.isSubscribed ? "Yes" : "No"}</td>
                    <td style={{cursor:"pointer"}} onClick = {() => props.giveAdminPermision(user)}> <FontAwesomeIcon icon={faUsers}/>  To Admin </td>
                </tr> )
            })}      
        </tbody>
    </table>
    )
}
