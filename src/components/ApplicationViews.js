import React from "react"
import { Route } from "react-router-dom"
import { LocationProvider } from "./location/LocationProvider";
import { LocationList } from "./location/LocationList";
import { LocationDetail } from "./location/LocationDetail";
import { LocationForm } from "./location/LocationForm";
import { AnimalProvider } from "./animal/AnimalProvider";
import { AnimalList } from "./animal/AnimalList";
import { AnimalForm } from "./animal/AnimalForm";
import { AnimalDetail } from "./animal/AnimalDetail";
import { CustomerProvider } from "./customer/CustomerProvider";
import { CustomerList } from "./customer/CustomerList";
import { CustomerDetail } from "./customer/CustomerDetail";
import { EmployeeProvider } from "./employee/EmployeeProvider";
import { EmployeeList } from "./employee/EmployeeList";
import { EmployeeForm } from "./employee/EmployeeForm";
import { EmployeeDetail } from "./employee/EmployeeDetail";

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


            <LocationProvider>
                <AnimalProvider>
                    <Route exact path="/locations">
                        <LocationList />
                    </Route>

                    <Route exact path="/locations/create">
                        <LocationForm />
                    </Route>
                    <Route exact path="/locations/detail/:locationId(\d+)">
                        <LocationDetail />
                    </Route>
                    <Route exact path="/locations/edit/:locationId(\d+)">
                        <LocationForm />
                    </Route>
                </AnimalProvider>
            </LocationProvider>


            <AnimalProvider>
                <LocationProvider>
                    <CustomerProvider>
                        <Route exact path="/animals">
                            <AnimalList />
                        </Route>
                        <Route exact path="/animals/create">
                            <AnimalForm />
                        </Route>
                        <Route exact path="/animals/detail/:animalId(\d+)">
                            <AnimalDetail />
                        </Route>
                        <Route exact path="/animals/edit/:animalId(\d+)">
                            <AnimalForm />
                        </Route>
                    </CustomerProvider>
                </LocationProvider>
            </AnimalProvider>


            <CustomerProvider>
                <Route exact path="/customers">
                    <CustomerList />
                </Route>
                <Route exact path="/customers/detail/:customerId(\d+)">
                    <CustomerDetail />
                </Route>
            </CustomerProvider>


            <EmployeeProvider>
                <LocationProvider>
                    <Route exact path="/employees">
                        <EmployeeList />
                    </Route>
                    <Route exact path="/employees/create">
                        <EmployeeForm />
                    </Route>
                    <Route exact path="/employees/detail/:employeeId(\d+)">
                        <EmployeeDetail />
                    </Route>
                    <Route exact path="/employees/edit/:employeeId(\d+)">
                        <EmployeeForm />
                    </Route>
                </LocationProvider>
            </EmployeeProvider>
        </>
    )
}