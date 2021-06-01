import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { useHistory } from 'react-router-dom'
import "./Animal.css"



export const AnimalList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { animals, getAnimals } = useContext(AnimalContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("AnimalList: useEffect - getAnimals")
    getAnimals()
  }, [])

  const history = useHistory()

  return (
    <>
      <h2>Animals</h2>
      <button onClick={
        () => history.push("/animals/create")
      }>
        Add Animal
      </button>
      <div className="animals">
        {
          animals.map(animal => {
            return (
              <div className="animal" id={`animal--${animal.id}`}>
                <div className="animal__name">
                  Name: {animal.name}
                </div>
                <div className="animal__breed">
                  Breed: {animal.breed}
                </div>
                <div className="animal__location">
                  Location: {animal.location.name}
                </div>
                <div className="animal__customer">
                  Owner: {animal.customer.name}
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}