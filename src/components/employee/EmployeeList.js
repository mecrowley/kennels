import React, { useContext, useEffect } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"

export const EmployeeList = () => {
  // This state changes when `getEmployees()` is invoked below
  const { employees, getEmployees } = useContext(EmployeeContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("EmployeeList: useEffect - getEmployees")
    getEmployees()
  }, [])


  return (
    <section className="employees">
      {console.log("EmployeeList: Render", employees)}
      {
        employees.map(employee => {
          return (
            <div className="employee" id={`employee--${employee.id}`}>
              <div className="employee__name">
                <h3>{ employee.name }</h3>
              </div>
              <div className="employee__location">
                Location: { employee.location.name }
              </div>
            </div>
          )
        })
      }
    </section>
  )
}