import React from "react"
import { Route } from "react-router-dom"
import { LocationProvider } from "./location/LocationProvider";
import { LocationList } from "./location/LocationList";
import { AnimalProvider } from "./animal/AnimalProvider";
import { AnimalList } from "./animal/AnimalList";
import { CustomerProvider } from "./customer/CustomerProvider";
import { CustomerList } from "./customer/CustomerList";
import { EmployeeProvider } from "./employee/EmployeeProvider";
import { EmployeeList } from "./employee/EmployeeList";

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <h2>Nashville Kennels</h2>
                <small>Loving care when you're not there.</small>
                <address>
                    <div>Visit Us at the Nashville North Location</div>
                    <div>500 Puppy Way</div>
                </address>
            </Route>

            {/* Render the location list when http://localhost:3000/ */}
            <LocationProvider>
                <Route path="/locations">
                    <LocationList />
                </Route>
            </LocationProvider>

            {/* Render the animal list when http://localhost:3000/animals */}
            <AnimalProvider>
                <Route path="/animals">
                    <AnimalList />
                </Route>
            </AnimalProvider>

            <CustomerProvider>
                <Route path="/customers">
                    <CustomerList />
                </Route>
            </CustomerProvider>

            <EmployeeProvider>
                <Route path="/employees">
                    <EmployeeList />
                </Route>
            </EmployeeProvider>
        </>
    )
}