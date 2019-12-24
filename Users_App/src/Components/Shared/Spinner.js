import React from 'react'

export default function Spinner() {
    return (
        <div style={{marginTop:"20%", marginLeft:"48%"}} className ="spinner-border" role="status">
            <span className ="sr-only">Loading...</span>
        </div>
    )
}
