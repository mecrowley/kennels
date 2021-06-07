import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"
import { useParams, useHistory } from "react-router-dom"

export const LocationDetail = () => {
    const { locations, getLocationById, deleteLocation } = useContext(LocationContext)
    const [location, setLocation] = useState({ employees: [], animals: [] })
    const { locationId } = useParams();


    useEffect(() => {
        if (locations.length > 0) {
            const locationObj = locations.find(l => l.id === parseInt(locationId))
            setLocation(locationObj)
        } else {
            getLocationById(parseInt(locationId))
                .then(locationObj => setLocation(locationObj))
        }
    }, [locationId])

    const history = useHistory()

    const handleDelete = () => {
        deleteLocation(location.id)
            .then(() => {
                history.push("/locations")
            })
    }

    return (
        <>
            <section className="locationDetail">
                <h3 className="location__name">{location.name}</h3>
                <div className="location__info">
                    <div>{location.address}</div>
                    <h4>Employees</h4>
                    {location.employees.map(employee => (<div>{employee.name}</div>))}
                    <h4>Current Residents</h4>
                    {location.animals.map(animal => (<div>{animal.name}</div>))}
                    <button className="detailButton" onClick={event => {
                        history.push(`/locations/edit/${location.id}`)
                    }}>Edit Location</button>
                    <button className="detailButton" onClick={handleDelete}>Delete Location</button>
                </div>
            </section>
        </>
    )
}