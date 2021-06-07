import React, { useContext, useEffect, useState } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"
import { useParams, useHistory } from "react-router-dom"

export const EmployeeDetail = () => {
    const { employees, getEmployeeById, deleteEmployee } = useContext(EmployeeContext)
    const [employee, setEmployee] = useState({ location: {} })
    const { employeeId } = useParams();

    useEffect(() => {
        if (employees.length > 0) {
            const employeeObj = employees.find(e => e.id === parseInt(employeeId))
            setEmployee(employeeObj)
        } else {
            getEmployeeById(parseInt(employeeId))
                .then(employeeObj => setEmployee(employeeObj))
        }
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
            <section className="employeeDetail">
                <h3 className="employee__name">{employee.name}</h3>
                <div className="employee__info">
                    <div className="employee__location">{employee.location.name}</div>
                    <button className="detailButton" onClick={() => {
                        history.push(`/employees/edit/${employee.id}`)
                    }}>Edit Employee</button>
                    <button className="detailButton" onClick={handleDelete}>Delete Employee</button>
                </div>
            </section>
        </>
    )
}