import { Marker, InfoWindow } from '@react-google-maps/api'
import React, { useState } from 'react'

function Positions() {
    const [click, setClick] = useState(false);
    return (
        <div>
            {click ? 
            <InfoWindow position={{ lat: 19.40230985905287, lng: -102.04674055520725 }}>
            <h2>This is where my family is from</h2></InfoWindow> : null}
            
            <Marker onClick={() => setClick(!false)} position={{ lat: 19.40230985905287, lng: -102.04674055520725 }} />
        </div>

    )
}

export default Positions
