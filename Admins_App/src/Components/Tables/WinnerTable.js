import React from 'react'

export default function WinnerTable( winnerss ) {
    let { winners } = winnerss
    return (
        <React.Fragment>
        <table className="table table-striped winnerTable" style={{width:"90%",marginLeft:"5%"}}>
            <thead>
                <tr>
                <th scope="col">Username </th>
                <th scope="col">User winning numbers </th>
                <th scope="col">Session winning Numbers </th>
                <th scope="col">Matches </th>
                <th scope="col">Session </th>
                <th scope="col">Prize </th>
                </tr>
            </thead>
            <tbody>
                {winners.map((winner,index) =>{return(
                    <tr key={index}>
                    <th scope="row">{winner.userName}</th>
                    <td>{winner.winningNumbers.join(" - ")}</td>
                    <td>{winner.session.winningNumbers.split(",").join(" - ")}</td>
                    <td>{winner.matches}</td>
                    <td>{winner.session.id}</td>
                    <td>{winner.prize}</td>
                </tr> )
                })}     
            </tbody>
        </table>
        </React.Fragment>
    )
}