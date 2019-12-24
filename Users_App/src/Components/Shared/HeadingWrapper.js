import React from 'react'

export default function HeadingWrapper(tittle) {
    let { title } = tittle
    return (
        <div className="headingWrapper" >
            <p>
                <b>
                    <i>
                        {title}
                    </i>
                </b>
            </p>
            
        </div>
    )
}
