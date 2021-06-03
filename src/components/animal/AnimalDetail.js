import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"
import { useParams } from "react-router-dom"

export const AnimalDetail = () => {
    const { animals, getAnimals } = useContext(AnimalContext)
    const { animalId } = useParams();

    useEffect(() => {
        getAnimals()
    }, [])

    const thisAnimal = animals.find(a => a.id === parseInt(animalId)) || { location: {}, customer: {} }

    return (
        <section className="animal">
            <h3 className="animal__name">{thisAnimal.name}</h3>
            <div className="animal__breed">{thisAnimal.breed}</div>
            <div className="animal__location">Location: {thisAnimal.location.name}</div>
            <div className="animal__owner">Customer: {thisAnimal.customer.name}</div>
        </section>
    )
}