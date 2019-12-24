import React from 'react'

export default function BonusCard(props) {
    const id = props.bonus.id
    let expirationDate = props.bonus.expirationDate.toString("yyyy/mm/dd")
    let date=expirationDate.substring(0,expirationDate.indexOf("T"))
    return (
        <div className="card" style={{margin:"7px",borderRadius:"20px"}}>
            <div className="card-header" >
                Confirm Bonus
            </div>
            <div className="card-body">
                <h5 className="card-title"><i>Congratulations you recieved additional bonus of {props.bonus.award} $ by our Admin which is valid due {date} !</i></h5>
                <p className="card-text">Please click on the confirm button to accept the additional bonus of {props.bonus.award} $</p>
                <button style={{marginLeft:"5px"}} onClick={()=>props.confirmBonus(id)} className="btn btn-primary"><i>Confirm</i></button>
            </div>
        </div>
    )
}
