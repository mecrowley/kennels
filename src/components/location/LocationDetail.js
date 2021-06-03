import React, { useContext, useEffect } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"
import { useParams } from "react-router-dom"

export const LocationDetail = () => {
    const { locations, getLocations } = useContext(LocationContext)
    const { locationId } = useParams();


    useEffect(() => {
        getLocations()   
    }, [])

    const thisLocation = locations.find(l => l.id === parseInt(locationId)) || { employees: [], customers: [] }
    const employeeNames = thisLocation.map(location => {return location.employees.name}).join(", ")

    return (
    <section className="location">
        <h3 className="location__name">{ thisLocation.name }</h3>
        <div className="location__address">{ thisLocation.address }</div>
        <h4>Employees</h4>
        <div className="employee__names">{ employeeNames }</div>
    </section>
    )
}