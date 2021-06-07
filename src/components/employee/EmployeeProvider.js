import React, { useState, createContext } from "react"

export const EmployeeContext = createContext()

export const EmployeeProvider = (props) => {
    const [employees, setEmployees] = useState([])

    const getEmployees = () => {
        return fetch("https://mec-kennels-api.herokuapp.com/employees?_expand=location")
        .then(res => res.json())
        .then(setEmployees)
    }

    const getEmployeeById = employeeId => {
        return fetch(`https://mec-kennels-api.herokuapp.com/employees/${employeeId}?_expand=location`)
        .then(res => res.json())
    }

    const addEmployee = employeeObj => {
        return fetch("https://mec-kennels-api.herokuapp.com/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employeeObj)
        })
        .then(getEmployees)
    }

    const updateEmployee = employee => {
        return fetch(`https://mec-kennels-api.herokuapp.com/employees/${employee.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(employee)
        })
          .then(getEmployees)
      }

    const deleteEmployee = employeeId => {
        return fetch(`https://mec-kennels-api.herokuapp.com/employees/${employeeId}`, {
            method: "DELETE"
        })
            .then(getEmployees)
    }

    return (
        <EmployeeContext.Provider value={{
            employees, getEmployees, getEmployeeById, addEmployee, updateEmployee, deleteEmployee
        }}>
            {props.children}
        </EmployeeContext.Provider>
    )
}