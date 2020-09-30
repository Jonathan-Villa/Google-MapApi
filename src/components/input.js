import {Marker, GoogleMap} from '@react-google-maps/api';
import React, {useState} from 'react'
import usePlacesAutocomplete, {getGeocode,getLatLng} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

function marker() {

    const PlaceAutoComple =()=>{
        const{
            value,
            suggestions:{status,data},
            setValue,
            clearSuggestion
        } = usePlacesAutocomplete();
    }

    const handleSelect =({description})=>() =>{
        setValue(description,false)
    }

    const ref = useOnclickOutside(()=>{
        clearSuggestion();

    })

    const renderSuggestion =()=>{
        data.map(suggestions =>{
            <li key={suggestions.id} onClick={handleSelect(suggestions)}>{}</li>
        })
    }


    return (
        <div>
            <input value={value} onChange={handleSelect}/>
            {status === 'OK' && <ul>{renderSuggestions()}</ul>}
        </div>
    )
}

export default marker
