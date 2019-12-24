import React from 'react'

export default function WinnersFilter(props) {
    return (
        <form>
            <div className="radio">
                <label className="radioLabel">Prize : 
                    <select style={{marginLeft:"5px"}} onChange={(e) =>props.handleOptionChange(e)}>
                        <option value="All">All</option>
                        <option value="GiftCard50">50</option>
                        <option value="GiftCard100">100</option>
                        <option value="TV">TV</option>
                        <option value="Vacation">Vacation</option>
                        <option value="Car">Car</option>
                    </select>                  
                </label>
            </div>
            <div className="radio" style={{width:"500px"}}>
                <label className="radioLabel" style={{display:"flex",color:"white"}}>Username : 
                    <div className="input-group mb-3 " style={{width:"200px",marginLeft:"5px"}}>                          
                        <input onKeyUp={(e)=>props.handleInputUser(e)} type="text" className="form-control userFilter" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                </label>
            </div>
        </form>
    )
}