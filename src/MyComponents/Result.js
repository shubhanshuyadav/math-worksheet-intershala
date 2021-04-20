import React from 'react'
import './Result.css'

function Result(props) {
    return (
        <div>
            <div className="result-title">Your Scrore is {props.score}/{props.total_questions}</div>
        </div>
    )
}

export default Result
