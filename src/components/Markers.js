import React from 'react'
import { Marker } from '@react-google-maps/api'

function Markers(props) {
    return (
        <Marker
            key={props.key}
            position={props.position}
        />
    )
}

export default Markers
