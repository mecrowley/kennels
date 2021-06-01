import React, { useContext, useEffect } from "react"
import { LocationContext } from "./LocationProvider"
import { useHistory } from 'react-router-dom'
import "./Location.css"

export const LocationList = () => {
  // This state changes when `getLocations()` is invoked below
  const { locations, getLocations } = useContext(LocationContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("LocationList: useEffect - getLocations")
    getLocations()
  }, [])

  const history = useHistory()

  return (
    <>
      <h2>Locations</h2>
      <button onClick={
        () => history.push("/locations/create")
      }>
            Add New Location
      </button>
      <div className="locations">
      {
        locations.map(location => {
          return (
            <div className="location" id={`location--${location.id}`}>
              <div className="location__name">
                Name: { location.name }
              </div>
              <div className="location__breed">
                Address: { location.address }
              </div>
            </div>
          )
        })
      }
      </div>
    </>
  )
}