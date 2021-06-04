import React, { useState, createContext } from "react"

export const CustomerContext = createContext()

export const CustomerProvider = (props) => {
    const [customers, setCustomers] = useState([])

    const getCustomers = () => {
        return fetch("http://localhost:8088/customers?_embed=animals")
        .then(res => res.json())
        .then(setCustomers)
    }

    const getCustomerById = customerId => {
        return fetch(`http://localhost:8088/customers/${customerId}?_embed=animals`)
        .then(res => res.json())
    }

    const addCustomer = customerObj => {
        return fetch("http://localhost:8088/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customerObj)
        })
        .then(getCustomers)
    }

    return (
        <CustomerContext.Provider value={{
            customers, getCustomers, getCustomerById, addCustomer
        }}>
            {props.children}
        </CustomerContext.Provider>
    )
}