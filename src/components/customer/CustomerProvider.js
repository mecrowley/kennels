import React, { useState, createContext } from "react"

export const CustomerContext = createContext()

export const CustomerProvider = (props) => {
    const [customers, setCustomers] = useState([])

    const getCustomers = () => {
        return fetch("https://mec-kennels-api.herokuapp.com/customers?_embed=animals")
        .then(res => res.json())
        .then(setCustomers)
    }

    const getCustomerById = customerId => {
        return fetch(`https://mec-kennels-api.herokuapp.com/customers/${customerId}?_embed=animals`)
        .then(res => res.json())
    }

    const addCustomer = customerObj => {
        return fetch("https://mec-kennels-api.herokuapp.com/customers", {
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