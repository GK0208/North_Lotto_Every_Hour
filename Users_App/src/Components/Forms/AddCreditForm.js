import React from 'react'

export const  AddCreditForm = (props) => {
    return (
        <form className="form" style={{marginTop:"5%"}}  onSubmit={(e)=>props.onSubmit(e)} >
        <div className="form-group ">
            <label htmlFor="exampleInputEmail1">
                <b>
                    Email address
                </b>
            </label>
            <input type = "email" className = "form-control" name = "email" id = "exampleInputEmail1" aria-describedby = "emailHelp" placeholder="Enter email" onChange={(e)=>props.onChange(e)} required/>
        </div>
        <div className="form-group">
            <label htmlFor = "exampleInputPassword1">
                <b>
                    Password
                </b>
            </label>
            <input type = "password" className="form-control" name = "password" id = "exampleInputPassword1" placeholder = "Password" onChange={(e)=>props.onChange(e)}  required/>           
        </div>    
        <div className="form-group">
            <label htmlFor = "CardNumber">
                <b>
                    Card number
                </b>
            </label>
            <input type = "number" className="form-control" name = "cardNumber" id = "CardNumber" placeholder = "Card number" onChange={(e)=>props.onChange(e)} required/>
            
        </div>
        <div className="form-group">
            <label htmlFor = "CardHolder">
                <b>
                    Card holder
                </b>
            </label>
            <input type = "text" className="form-control" name = "cardHolder" id = "CardHolder" placeholder = "Card holder" onChange={(e)=>props.onChange(e)} required/>
            
        </div>   
        <div className="form-group ">
            <label htmlFor="exampleInputEmail1">
                <b>
                    Amount
                </b>
            </label>
            <input type = "number" className = "form-control" name = "amount" id = "amount" aria-describedby = "emailHelp" placeholder="Insert amount" onChange={(e)=>props.onChange(e)} required/>
        </div>    
        <p id="passwordMatch" style={{color:"red"}}></p>
        <button type = "submit" className = "btn btn-primary" style={{marginLeft:"45%",marginTop:"2%",marginBottom:"2%"}}>Submit</button>    
           
    </form>
    )
}
