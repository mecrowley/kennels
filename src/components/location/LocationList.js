import React, { useContext, useEffect } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"

export const LocationList = () => {
  // This state changes when `getLocations()` is invoked below
  const { locations, getLocations } = useContext(LocationContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("LocationList: useEffect - getLocations")
    getLocations()
  }, [])


  return (
    <section className="locations">
      {console.log("LocationList: Render", locations)}
      {
        locations.map(location => {
          return (
            <div className="location" id={`Location--${location.id}`}>
              <div className="location__name">
                <h3>{ location.name }</h3>
              </div>
              <div className="location__address">
                Address: { location.address }
              </div>
            </div>
          )
        })
      }
    </section>
  )
}