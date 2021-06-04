import React, { useContext, useEffect, useState } from "react"
import { CustomerContext } from "./CustomerProvider"
import "./Customer.css"
import { useParams } from "react-router-dom"

export const CustomerDetail = () => {
    const { customers, getCustomerById } = useContext(CustomerContext)
    const [customer, setCustomer] = useState({ animals: [] })
    const { customerId } = useParams();

    useEffect(() => {
        if (customers > 0) {
            const customerObj = customers.find(c => c.id === parseInt(customerId))
            setCustomer(customerObj)
        } else {
            getCustomerById(parseInt(customerId))
                .then(customerObj => setCustomer(customerObj))
        }
    }, [customerId])

    return (
        <>
            <section className="customer">
                <h3 className="customer__name">{customer.name}</h3>
                <div>{customer.address}</div>
                <h4>Pets</h4>
                {customer.animals.map(animal => (<div>{animal.name}</div>))}
            </section>
        </>
    )
}