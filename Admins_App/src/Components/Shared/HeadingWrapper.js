import React from 'react'

export default function HeadingWrapper(tittle) {
    let { title } = tittle
    return (
        <div className="headingWrapper">
            <h1>
                <b>
                    <i>
                        {title}
                    </i>
                </b>
            </h1>
            
        </div>
    )
}
