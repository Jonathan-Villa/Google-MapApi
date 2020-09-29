import React, { useState } from 'react';
import './App.css'
import { containerStyle, center } from './style/style'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const apiKey = 'AIzaSyCdnUr2jm0d1m07Awac2ZgHH66ekKT21oQ'

function App() {

  const [marker, setMarker] = useState([]);

  const markIcon =(e)=>{

    setMarker((currentState)=>([
      ...currentState,
      {
        lat_c : e.latLng.lat(),
        lng_c : e.latLng.lng(),
        time : +1
      }
    ]))


  }

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
    >

      <div className='map-container'>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={markIcon}
        >
          {marker.map((m,index) => (
            <Marker
              key={index}
              position={{ lat: m.lat_c, lng: m.lng_c}}
            />
          ))}
        </GoogleMap>

      </div>

    </LoadScript>
  )
}

export default App;