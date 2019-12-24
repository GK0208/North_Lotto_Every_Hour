import React from 'react'

export default function WelcomeJumbotron(admins) {
    let { admin }= admins
    var index =  admin.userName.indexOf("@")
    return (
        <div className="jumbotron" style={{textAlign:"center"}}>
            <h1 className="display-4">Hello, {admin.userName.substring(index,admin.length-index).toUpperCase()}</h1>
        </div>
    )
}