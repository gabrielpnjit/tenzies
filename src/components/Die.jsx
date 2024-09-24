import React from "react"
import "./Die.css"

export default function Die(props) {
    let valueClass = "";
    switch(props.value) {
        case 1: 
            valueClass = "one-face";
            break;
        case 2:
            valueClass = "two-face";
            break;
        case 3:
            valueClass = "three-face";
            break;
        case 4:
            valueClass = "four-face";
            break;
        case 5:
            valueClass = "five-face";
            break;
        case 6:
            valueClass = "six-face"
    }

    const classes = `die-square ${props.isHeld && "die-held"} ${valueClass} ${props.tenzies && "die-tenzies"}`;


    const dotElements = []

    if (props.value < 4) {
        for (let i = 0; i < props.value; i++) {
            dotElements.push(<span className="dot" key={i}></span>)
        }
    }
    else if (props.value == 4 || props.value == 6) {
        for (let i = 0; i < props.value / 2; i++) {
            dotElements.push(
                <div className="row" key={i}>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            )
        }
    }
    else if (props.value == 5) {
        for (let i = 0; i < 3; i++) {
            if (i == 1) {
                dotElements.push(
                    <div className="row" key={i}>
                        <span className="dot"></span>
                    </div>
                )
            }
            else {
                dotElements.push(
                    <div className="row" key={i}>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                )
            }
        }
    }

    return (
        <div className={classes} onClick={props.holdDice}>
            {/* <h2 className="die-num">{props.value}</h2> */}
            {dotElements}
        </div>
    )
}