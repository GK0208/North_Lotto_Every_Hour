import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';


export default function UserTicketsTable(props) {    
    let { tickets } = props
    return (
        <React.Fragment>
        <table className="table table-striped table-dark" style={{width:"90%",marginLeft:"5%"}}>
            <thead>
                <tr>
                <th scope="col">Ticket ID </th>
                <th scope="col">Numbers </th>
                <th scope="col">Active </th>
                <th scope="col">Session </th>
                <th scope="col">Prize </th>
                </tr>
            </thead>
            <tbody>
                {tickets.map((ticket,index) =>{return(
                    <tr key={index}>
                    <th scope="row">{ticket.ticketId}</th>
                    <td>{ticket.numbers.split(",").join(" - ")}</td>
                    <td>{ticket.active ? <p style={{color:"green"}}>Active</p> : <p style={{color:"red"}}>Not Active</p>}</td>
                    <td>{ticket.sessionId}</td>
                    <td>{ticket.win ? ticket.prize :  ticket.active ? <p>On Waiting ..</p> : <FontAwesomeIcon style={{color:"yellow"}} icon={faFrown} />}</td>
                </tr> )
                })}     
            </tbody>            
        </table>
        { !tickets.length ? <div style={{color:"red",width:"100%",textAlign:"center"}}>No results </div> : null}
        </React.Fragment>
    )
}
