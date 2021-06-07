import React, { useState, createContext } from "react"

export const LocationContext = createContext()

export const LocationProvider = (props) => {
    const [locations, setLocations] = useState([])

    const getLocations = () => {
        return fetch("https://mec-kennels-api.herokuapp.com/locations?_embed=employees&_embed=animals")
        .then(res => res.json())
        .then(setLocations)
    }
    
    const getLocationById = locationId => {
        return fetch(`https://mec-kennels-api.herokuapp.com/locations/${locationId}?_embed=employees&_embed=animals`)
        .then(res => res.json())
    }

    const addLocation = locationObj => {
        return fetch("https://mec-kennels-api.herokuapp.com/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(locationObj)
        })
        .then(getLocations)
    }

    const updateLocation = location => {
        return fetch(`https://mec-kennels-api.herokuapp.com/${location.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(location)
        })
          .then(getLocations)
      }

    const deleteLocation = locationId => {
        return fetch(`https://mec-kennels-api.herokuapp.com/${locationId}`, {
            method: "DELETE"
        })
            .then(getLocations)
    }

    return (
        <LocationContext.Provider value={{
            locations, getLocations, getLocationById, addLocation, updateLocation, deleteLocation
        }}>
            {props.children}
        </LocationContext.Provider>
    )
}