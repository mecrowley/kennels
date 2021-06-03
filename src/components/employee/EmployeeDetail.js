import React, { useContext, useEffect } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"
import { useParams } from "react-router-dom"

export const EmployeeDetail = () => {
    const { getEmployees, employees } = useContext(EmployeeContext)
    const { employeeId } = useParams();

    useEffect(() => {
        getEmployees()
    }, [employeeId])

    const thisEmployee = employees.find(e => e.id === parseInt(employeeId)) || { location: {} }

    return (
        <section className="employee">
            <h3 className="employee__name">{thisEmployee.name}</h3>
            <div className="employee__location">Location: {thisEmployee.location.name}</div>
        </section>
    )
}