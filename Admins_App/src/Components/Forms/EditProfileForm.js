import React from 'react'

export default function EditProfileForm(props) {
    let  { userName, dateOfBirth, gender, city, state, mobile } = props.admin;

    let date = dateOfBirth.toString("MM/DD/YYYY")
    let birthdate= date.substring(0,date.indexOf("T"))
    return (
        <div className="container">
            <form onSubmit={(e)=>props.onSubmit(e)}>
                    
                    <div className="form-group ">
                        <label htmlFor="username" className="col-3 col-form-label">Username:</label>
                            <div className="col-9">
                                <input type="text" className="form-control" id="user" name="userName" value={userName} onChange={(e)=>props.onChange(e)} />
                            </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city" className="col-3 col-form-label">City : </label>
                            <div className="col-9">
                                <input type="text" className="form-control" id="city" name="city" value={city} onChange={(e)=>props.onChange(e)}  />
                            </div>
                    </div>
                   
                    
                    <div className="form-group ">
                        <label htmlFor="state" className="col-3 col-form-label">State :</label>
                            <div className="col-9">
                                <input type="text" className="form-control" id="state" name="state" value={state} onChange={(e)=>props.onChange(e)}  />
                            </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile" className="col-3 col-form-label">Mobile : </label>
                            <div className="col-9">
                                <input type="text" className="form-control" id="mobile" name="mobile" value={mobile} onChange={(e)=>props.onChange(e)}  />
                            </div>
                    </div>
                    
                    <div className="form-group ">
                        <label htmlFor="birthDate" className="col-3 col-form-label">Birth date :</label>
                            <div className="col-9">
                                <input type="date" className="form-control" id="birthDate" name="dateOfBirth" value={birthdate} onChange={(e)=>props.onChange(e)}  />
                            </div>       
                    </div>                                       
                    <div className="form-group ">
                        <label className="genderRadio" >
                            <input className="gender" type="radio" checked={ gender === "Male"} name="gender"  value="Male" onChange={(e)=>props.onChange(e)} />Male
                        </label>                     
                        <label className="genderRadio" >
                            <input className="gender" type="radio" name="gender" checked={ gender === "Female"} value="Female" onChange={(e)=>props.onChange(e)} />Female
                        </label>
                    </div>
                    <div className="form-group" style={{display:"block"}}>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                    <p id = "wrongAdminInput" style={{color: 'red', display: 'none'}}>
                        Some of the inputs are incorrect
                    </p>
                </form>
            </div>
    )
}