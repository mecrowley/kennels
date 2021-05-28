import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const OwnerContext = createContext()

// This component establishes what data can be used.
export const OwnerProvider = (props) => {
    const [owners, setOwners] = useState([])

    const getOwners = () => {
        return fetch("http://localhost:8088/owners?_expand=location")
        .then(res => res.json())
        .then(setOwners)
    }

    const addOwner = OwnerObj => {
        return fetch("http://localhost:8088/owners", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(OwnerObj)
        })
        .then(getOwners)
    }

    /*
        You return a context provider which has the
        `Owners` state, `getOwners` function,
        and the `addOwner` function as keys. This
        allows any child elements to access them.
    */
    return (
        <OwnerContext.Provider value={{
            owners, getOwners, addOwner
        }}>
            {props.children}
        </OwnerContext.Provider>
    )
}