import React from "react"

function Dies(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white" 
    }
    return (
        <div 
            className="dies-face"  
            style={styles} 
            onClick={props.holdDice}
        >
            
            <h2 className="dies-num">   {props.value}</h2>
        </div>
    )
} 

export default Dies;