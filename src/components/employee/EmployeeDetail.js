import React, { useContext, useEffect, useState } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"
import { useParams, useHistory } from "react-router-dom"

export const EmployeeDetail = () => {
    const { getEmployeeById, deleteEmployee } = useContext(EmployeeContext)
    const [employee, setEmployee] = useState({ location: {} })
    const { employeeId } = useParams();

    useEffect(() => {
        getEmployeeById(parseInt(employeeId))
        .then(employeeObj => setEmployee(employeeObj))
    }, [employeeId])

    const history = useHistory()

    const handleDelete = () => {
        deleteEmployee(employee.id)
            .then(() => {
                history.push("/employees")
            })
    }

    return (
        <>
        <section className="employee">
            <h3 className="employee__name">{employee.name}</h3>
            <div className="employee__location">{employee.location.name}</div>
            <button onClick={handleDelete}>Delete Employee</button>
        </section>
        </>
    )
}