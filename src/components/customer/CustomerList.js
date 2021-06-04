import React, { useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom";
import { CustomerContext } from "./CustomerProvider"
import "./Customer.css"

export const CustomerList = () => {
  const { customers, getCustomers } = useContext(CustomerContext)
  const history = useHistory()

  useEffect(() => {
    getCustomers()
  }, [])

  return (
    <>
      <h1>Customers</h1>
      <div className="customers">
        {
          customers.map(customer => {
            return (
              <div className="customer">
                <Link to={`/customers/detail/${customer.id}`}>
                  <h3>{customer.name}</h3>
                </Link>
              </div>
            )
          })
        }
      </div>
    </>
  )
}