import React from 'react'

export default function WelcomeJumbotron(users) {
    let {user}= users
    var index =  user.userName.indexOf("@")
    return (
        <div className="jumbotron" style={{textAlign:"center"}}>
            <h1 className="display-4">Hello, {user.userName.substring(index,user.length-index).toUpperCase()}</h1>
            <p className="lead">Welcome to Lotto Every Hour, feel free to test your luck by submiting your lucky numbers and wait till the draw happening every hour ! </p>
            <hr className="my-4"/>
            <h2>Rules of playing :</h2>
            <ul className="rules">
                <li>
                    <i>
                        Go to "New ticket" select your lucky seven numbers and submit your ticket
                    </i> 
                </li>
                <li>
                    <i>
                        Wait till the draw happening every hour
                    </i> 
                </li>
                <li>
                    <i>
                        Go to "Winners" and search for your username if it's there it means you win otherwise you can create new tickets for the next session
                    </i>
                </li>
                <li>
                    <i>
                        In "Tickets" you can find all your tickets and see their status also
                    </i> 
                </li>
            </ul>
            <h2 className="ourTeam">GOOD LUCK!</h2>
            
        </div>
    )
}
