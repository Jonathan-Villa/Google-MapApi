import React, { useState, useCallback } from 'react';
import './App.css'
import { containerStyle } from './style/style'
import { GoogleMap, LoadScript, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';
import { center } from './style/style'
import Positions from './components/positions'
import * as M from '@material-ui/core'


const apiKey="{YOUR API KEY}"
const library = ["places"]
function App() {

  const [marker, setMarker] = useState([]);
  const [map, setMap] = useState(null)
  const [centerMap, setCenterMap] = useState()
  const [input, setInput] = useState([])
  const [panMarker, setPanMarker] = useState(false)

  const onUnmount = useCallback(() => { // Clear the render if unmount
    setMap(null)
  }, [])

  const onLoad = (map) => { // get map props for global use
    setMap(map)
  }

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

  const handleMarkerClick = (id) => { // Handles click --> filter markers by key value
    setMarker(marker.filter((_, index) => index !== id))
  }

  const handleCenter = () => {
    console.log(centerMap)
  }

  const dragHandler = () => {  // set the cordinates for the center on every drag event
    setCenterMap(map.getCenter())
  }
  const dragEndHandler = () => { }

  const handleLoad = (autoComplete) => setInput(autoComplete) // onload --> set the input state

  const handlePlaceChanged = async () => {

    try {
      let place = await input.getPlace()
      let lat = await place.geometry.location.lat();
      let lng = await place.geometry.location.lng();


      map.panTo({ lat, lng })
      map.setZoom(14)
      setPanMarker({
        lat_p: lat,
        lng_p: lng
      });
    } catch (err) {
      alert("Please Enter a valid field")
    }
  }

  const infoWindowPosition = { lat: 41.604468, lng: -88.080754 }

  return (
    <LoadScript libraries={library} googleMapsApiKey={apiKey}>

      <M.Container id="map-container">
        <M.FormControl id='map-form'>
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

            {panMarker ? <Marker position={{ lat: panMarker.lat_p, lng: panMarker.lng_p }} /> : null}
            <Positions />
            <div>
              {marker.map((m, id) => (
                <Marker
                  key={id}
                  position={{ lat: m.lat_c, lng: m.lng_c, id: m.id }}
                  onClick={() => handleMarkerClick(id)}
                />
              ))}
            </div>

            <InfoWindow position={infoWindowPosition}>
              <div className="info-window">
                <h2>InfoWindow</h2>
              </div>
            </InfoWindow>
          </GoogleMap>
          <div id="input-container">
            <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
              <M.TextField autoFocus type="search" id="input-map" variant="filled" />
            </Autocomplete>
          </div>
        </M.FormControl>
      </M.Container>
    </LoadScript>
  )
}

export default App;
