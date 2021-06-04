import React, { useContext, useEffect, useState } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"
import { useParams } from "react-router-dom"

export const EmployeeDetail = () => {
    const { getEmployeeById } = useContext(EmployeeContext)
    const [employee, setEmployee] = useState({ location: {} })
    const { employeeId } = useParams();

    useEffect(() => {
        getEmployeeById(parseInt(employeeId))
        .then(employeeObj => setEmployee(employeeObj))
    }, [employeeId])

    return (
        <>
        <section className="employee">
            <h3 className="employee__name">{employee.name}</h3>
            <div className="employee__location">{employee.location.name}</div>
        </section>
        </>
    )
}