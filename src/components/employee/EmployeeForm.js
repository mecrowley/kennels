import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import { EmployeeContext } from "../employee/EmployeeProvider"
import "./Employee.css"
import { useHistory, useParams } from 'react-router-dom';

export const EmployeeForm = () => {
  const { addEmployee, getEmployeeById, updateEmployee } = useContext(EmployeeContext)
  const { locations, getLocations } = useContext(LocationContext)
  const [employee, setEmployee] = useState({ location: [] });
  const { employeeId } = useParams()
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true)

  
  useEffect(() => {
    getLocations().then(() => {
      if (employeeId) {
        getEmployeeById(parseInt(employeeId))
          .then(employee => {
            setEmployee(employee)
            setIsLoading(false)
          })
      } else {
        setIsLoading(false)
      }
    }
    )
  }, [])


  const handleControlledInputChange = (event) => {
    const newEmployee = { ...employee }
    newEmployee[event.target.id] = event.target.value
    setEmployee(newEmployee)
  }

  const handleSaveEmployee = () => {
    const locationId = parseInt(employee.locationId)
    if (locationId === 0) {
      window.alert("Please select a location")
    } else {
      setIsLoading(true)
      if (employeeId) {
        updateEmployee({
          id: parseInt(employeeId),
          name: employee.name,
          locationId: locationId
        })
          .then(() => { history.push(`/employees/detail/${parseInt(employeeId)}`) })
      } else {
        addEmployee({
          name: employee.name,
          locationId: locationId,
        })
          .then(() => history.push("/employees"))
      }
    }
  }

  return (
    <form className="employeeForm">
      <h2 className="employeeForm__title">New Employee</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Employee name:</label>
          <input type="text" id="name" required autoFocus className="form-control" placeholder="Employee name" value={employee.name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Assign to location: </label>
          <select name="locationId" id="locationId" className="form-control" value={employee.locationId} onChange={handleControlledInputChange}>
            <option value="0">Select a location</option>
            {locations.map(l => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button className="btn btn-primary"
        disabled={isLoading}
        onClick={event => {
          event.preventDefault()
          handleSaveEmployee()
        }}>
        {employeeId ? <>Save Employee</> : <>Add Employee</>}
      </button>
    </form>
  )
}