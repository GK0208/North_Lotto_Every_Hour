import React from 'react'

export default function LoginForm(props) {
    return (
        <React.Fragment>
        <form className="formLogin" onSubmit={(e)=>props.OnSubmit(e)}>
                    <div className="form-groups email">
                        <label htmlFor="exampleInputEmail1">
                            <b>
                                Email address
                            </b>
                        </label>
                        <input type = "email" className = "form-control" name="username"  placeholder="Enter email" onChange={(e)=>props.onChange(e)} required/>
                        <small id = "emailHelp" className = "form-text text-muted">
                            <i>
                                We'll never share your email with anyone else.
                            </i>
                        </small>
                    </div>
                    <div className="form-groups">
                        <label htmlFor = "exampleInputPassword1">
                            <b>
                                Password
                            </b>
                        </label>
                        <input type = "password" name="password" className="form-control" minLength ={6} onChange={(e) => props.onChange(e)} placeholder = "Password" required/>
                    </div>
                    <button type = "submit" className = "btn btn-primary">Log In</button>
                    <p id ="invalidLogin" style={{color:"red",display:"none"}}>Email or password is incorect !</p>
                    
                </form>
                <a href = "/signUp" style={{marginLeft:"35%"}}>
                    <i>Dont have an acount sign up here !</i>
                </a>
            </React.Fragment>
                
    )
}
