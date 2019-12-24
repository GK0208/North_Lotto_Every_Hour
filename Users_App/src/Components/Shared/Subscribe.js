import React from 'react';



const Subscribe = (props) =>{ 
        return(
            <div className="subscribeContainer">
                    <div className="subscribeText">
                      Subscribe to North Lotto Every Hour and be up to date for every session on your email !
                    </div>           
                    <button className="subscribeButton" onClick={() => props.handleSubscription()}>
                        <div className="subscribeButtonText">
                            Subscribe me
                        </div>
                    </button>
                </div>
        )
    }

export default Subscribe