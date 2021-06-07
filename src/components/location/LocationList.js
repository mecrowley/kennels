import React, { useContext, useEffect } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"
import { Link, useHistory } from "react-router-dom"

export const LocationList = () => {
  const { getLocations, locations } = useContext(LocationContext)

  // Initialization effect hook -> Go get Location data
  useEffect(() => {
    getLocations()
  }, [])

  const history = useHistory()

  return (
    <>
      <h1>Locations</h1>

      <div className="locations">
        {
          locations.map(location => {
            return (
              <>
                <div className="location">
                  <Link to={`/locations/detail/${location.id}`}>
                    <h3>{location.name}</h3>
                  </Link>
                  <div>Employees: {location.employees.length}</div>
                  <div>Animals: {location.animals.length}</div>
                </div>
              </>
            )
          })
        }
      </div>
      <button className="addButton" onClick={() => history.push("/locations/create")}>
        Add New Location
            </button>
    </>
  )
}