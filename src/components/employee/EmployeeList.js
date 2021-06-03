import React, { useContext, useEffect } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"
import { Link, useHistory } from "react-router-dom"

export const EmployeeList = () => {
  const { getEmployees, employees } = useContext(EmployeeContext)

  // Initialization effect hook -> Go get Employee data
  useEffect(() => {
    getEmployees()
  }, [])

  const history = useHistory()
  
  return (
    <>
      <h1>Employees</h1>

      <button onClick={() => history.push("/employees/create")}>
        Add New Employee
            </button>

      <div className="employees">
        {
          employees.map(employee => {
            return (
              <>
                <div className="employee">
                  <Link to={`/employees/detail/${employee.id}`}>
                    <h3>{employee.name}</h3>
                  </Link>
                </div>
              </>
            )
          })
        }
      </div>
    </>
  )
}