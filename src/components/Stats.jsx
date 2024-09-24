import React from "react"
import "./Stats.css"

export default function Stats(props) {
    function formatTime(time) {
        const seconds = Math.floor(time);
        const milliseconds = Math.floor((time - seconds) * 1000);
        const paddedMilliseconds = milliseconds.toString().padStart(3, "0");
      
        return `${seconds}.${paddedMilliseconds}`;
      }
    return (
        <div className="stats-container">
            <span>Time: {formatTime(props.time)}</span>
            <span>Rolls: {props.rollCount}</span>
        </div>
    )
}