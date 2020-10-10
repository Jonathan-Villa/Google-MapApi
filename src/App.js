import React, { useState, useCallback, useRef} from 'react';
import './App.css'
import { containerStyle } from './style/style'
import { GoogleMap, LoadScript, Marker,InfoWindow, Autocomplete} from '@react-google-maps/api';
import {center} from './style/style'
import Positions from './components/positions'
const apiKey = process.env.API_KEY


function App() {
  const [marker, setMarker] = useState([]);
  const [map, setMap] = useState(null)
  const [centerMap, setCenterMap] = useState()
  const [input, setInput] = useState([])

  const onLoad =(map)=>{ // get map props for global use
    setMap(map)
  }

  const onUnmount = useCallback((map) => { // Clear the render if unmount
    setMap(null)
  }, [])

  const markIcon = (e) => { // Set multiple markers
    setMarker((currentState) => ([
      ...currentState,
      {
        lat_c: e.latLng.lat(),
        lng_c: e.latLng.lng(),
        id: Date.now()
      },
    ]));
  }

  const handleClick = (id) => { // Handles click --> filter markers by key value
    setMarker(marker.filter((_,index)=> index !== id))
  }

  const handleCenter=()=>{ 
      console.log(centerMap)
  }

  const dragHandler=()=>{  // set the cordinates for the center on every drag event
    setCenterMap(map.getCenter())
  }
  const dragEndHandler=()=>{

  }

  const handleLoad =(auto)=> setInput(auto)

  const handlePlaceChanged=()=>{
    console.log(input.getPlace())
  }

  const infoWindowPosition={lat:41.604468, lng:-88.080754}


  return (
    <LoadScript libraries={["places"]} googleMapsApiKey={apiKey}>
      <div className='main-header'><h1>Try finding my favorite locations!</h1></div>
      <div className='map-container'>
        <GoogleMap
          id="google-map"
          onUnmount={onUnmount}
          onLoad={onLoad}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={7}
          onClick={markIcon}
          onDrag={dragHandler}
          onDragEnd={dragEndHandler}
          onCenterChanged={handleCenter}
        >
        <Positions/>

          <div>
            {marker.map((m,id)=> (
              <Marker
                key={id}
                position={{ lat: m.lat_c, lng: m.lng_c , id: m.id}}
                onClick={()=>handleClick(id)}
              />
            ))}
          </div>

          <InfoWindow
            position={infoWindowPosition}
          >

          <div className="info-window">
            <h2>InfoWindow</h2>
          </div>

          </InfoWindow>
          
        
        </GoogleMap>

        <div className="input-container">
        <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
          <input className="input-map" aria-label='enter a location'/>
        </Autocomplete>
        </div>
      </div>
    </LoadScript>
  )
}

export default App;
