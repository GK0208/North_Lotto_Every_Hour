import React from 'react'

export default function CreateTicketForm(props) {
    return (
        <form className = "ticketForm" >
            { props.numbers.map((x,index) => {
                return (           
                    <div className="divCheckbox" key = {index}>
                        <label className = "numbersLabel"> 
                            <input className = "checkbox" type = "checkbox" value = {x} onClick = {(x) => props.checkNumber(x)} />
                            {x}
                         </label>
                    </div>
                                    )
             })}             
        </form>
    )
}
