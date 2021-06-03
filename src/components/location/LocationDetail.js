import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"
import { useParams } from "react-router-dom"

export const LocationDetail = () => {
    const { getLocationById } = useContext(LocationContext)
    const [ location, setLocation ] = useState({ employees: [], animals: [] })
    const { locationId } = useParams();


    useEffect(() => {
        getLocationById(parseInt(locationId))
        .then(locationObj => setLocation(locationObj))
    }, [locationId])


    return (
        <>
    <section className="location">
        <h3 className="location__name">{location.name}</h3>
        <div>{location.address}</div>
        <h4>Employees</h4>
        { location.employees.map(employee => (<div>{employee.name}</div>))}
        <h4>Locations</h4>
        { location.animals.map(animal => (<div>{animal.name}</div>))}
    </section>
    </>
)
}