import React from 'react'

export default function TicketFilters(props) {
    return (
        <div  style={{display:"flex",marginTop:"3%",marginLeft:"10%",marginBottom:"0px"}}>
            <form>
                <div className="radio">
                    <label className="radioLabel">
                        <input 
                            type="radio"  
                            className="radioOptions"  
                            value="All" 
                            checked={props.selectedOption === 'All'}
                            onChange={(e) =>props.handleOptionChange(e)} 
                        />
                        All
                    </label>
                </div>
                <div className="radio">
                    <label className="radioLabel">
                        <input 
                            className="radioOptions"
                            type="radio" 
                            value="Active" 
                            checked={props.selectedOption === 'Active'}
                            onChange={(e) =>props.handleOptionChange(e)} 
                        />
                        Active
                    </label>
                </div>
                <div className="radio">
                    <label className="radioLabel">
                        <input 
                            type="radio" 
                            className="radioOptions"
                            value="Win"  
                            checked={props.selectedOption === 'Win'}
                            onChange={(e) =>props.handleOptionChange(e)}
                        />
                        With win
                    </label>
                </div>
            </form>
        </div>
    )
}
