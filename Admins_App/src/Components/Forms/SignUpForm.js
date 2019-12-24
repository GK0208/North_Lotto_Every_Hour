import React from 'react'

export default function SignUpForm(props) {
    return (
        <form className="form" onSubmit={(e)=>props.OnSubmit(e)}>
            <div className="form-group ">
                <label htmlFor="exampleInputEmail1">
                    <b>
                        Email address
                    </b>
                </label>
                <input type = "email" className = "form-control" name = "UserName" id = "exampleInputEmail1" aria-describedby = "emailHelp" placeholder="Enter email" onChange={(e)=>props.onChange(e)} required/>
                <small  className = "form-text text-muted">
                            <i id="email">
                               *Required
                            </i>
                </small>
            </div>
            <div className="form-group">
                <label htmlFor = "City">
                    <b>
                        City
                    </b>
                </label>
                <input type = "text" className="form-control" id = "City" name = "City" placeholder = "City" onChange={(e)=>props.onChange(e)}/>
                <small id = "city" className = "form-text text-muted">
                            <i>
                               *Optional
                            </i>
                </small>
            </div>
            <div className="form-group">
                <label htmlFor = "exampleInputPassword1">
                    <b>
                        Password
                    </b>
                </label>
                <input type = "password" className="form-control" name = "Password" id = "exampleInputPassword1" placeholder = "Password" onChange={(e)=>props.onChange(e)}  required/>
                <small  className = "form-text text-muted">
                            <i id = "password">
                               *Required
                            </i>
                </small>
            </div>    
            <div className="form-group">
                <label htmlFor = "Age">
                    <b>
                        Age
                    </b>
                </label>
                <input type = "number" className="form-control" name = "Age" id = "Age" placeholder = "Age" min="10" max="100" onChange={(e)=>props.onChange(e)} />
                <small id = "age" className = "form-text text-muted">
                            <i>
                               *Optional
                            </i>
                </small>
            </div>
            <div className="form-group">
                <label htmlFor = "exampleInputPassword1">
                    <b>
                        Confirm-Password
                    </b>
                </label>
                <input type = "password" className="form-control" name = "ConfirmPassword" id = "exampleInputPassword2" placeholder = "Confirm-Password" onChange={(e)=>props.onChange(e)}  required/>
                <small  className = "form-text text-muted">
                            <i id = "confirmPassword">
                               *Required
                            </i>
                </small>
            </div>
            <div className="form-group">
                <label htmlFor = "State">
                    <b>
                        State
                    </b>
                </label>
                <input type = "text" className="form-control" name = "State" id = "State" placeholder = "State" onChange={(e)=>props.onChange(e)}/>
                <small id = "state" className = "form-text text-muted">
                            <i>
                               *Optional
                            </i>
                </small>
            </div>
            <div className="form-group">
                <label htmlFor = "Birthdate">
                    <b>
                        Date of Birth
                    </b>
                </label>
                <input type = "date" className="form-control" name = "DateOfBirth" id = "Birthdate" placeholder = "Format : YYYY-MM-DD" onChange={(e)=>props.onChange(e)} required/>
                <small id = "birthdate" className = "form-text text-muted">
                            <i>
                               *Required
                            </i>
                </small>
            </div>
            <div className="form-group">
                <label htmlFor = "Mobile">
                    <b>
                        Mobile number
                    </b>
                </label>
                <input type = "text" className="form-control" name = "Mobile" id = "Mobile" placeholder = "Mobile number" onChange={(e)=>props.onChange(e)}/>
                <small id = "mobile" className = "form-text text-muted">
                            <i>
                               *Optional
                            </i>
                </small>
            </div>           
            <p id="passwordMatch" style={{color:"red"}}></p>
            <button type = "submit" className = "btn btn-primary">Sign Up</button>    
               
        </form>
    )
}
