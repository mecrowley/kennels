import React from "react"
import { Location } from "./location/Location";
import { Employee } from "./employee/Employee";
import { Animal } from "./animal/Animal";
import { Owner } from "./owner/Owner";
import "./Kennel.css"

export const Kennel = () => (
    <>
        <h2>Nashville Kennels</h2>
        <small>Loving care when you're not there.</small>
        <address>
            <div>Visit Us at the Nashville North Location</div>
            <div>500 Puppy Way</div>
        </address>

        <h2>Locations</h2>
        <article className="locations">
            <Location />
            <Location />
        </article>

        <h2>Employees</h2>
        <article className="employees">
            <Employee />
            <Employee />
            <Employee />
        </article>

        <h2>Animals</h2>
        <article className="animals">
            <Animal />
            <Animal />
            <Animal />
        </article>

        <h2>Owners</h2>
        <article className="owner">
            <Owner />
            <Owner />
            <Owner />
            <Owner />
        </article>
    </>
)