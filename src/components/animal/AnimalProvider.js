import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const AnimalContext = createContext()

// This component establishes what data can be used.
export const AnimalProvider = (props) => {
    const [animals, setAnimals] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("")

    const getAnimals = () => {
        return fetch("https://mec-kennels-api.herokuapp.com/animals?_expand=location&_expand=customer")
        .then(res => res.json())
        .then(setAnimals)
    }

    const getAnimalById = animalId => {
        return fetch(`https://mec-kennels-api.herokuapp.com/animals/${animalId}?_expand=location&_expand=customer`)
        .then(res => res.json())
    }

    const addAnimal = animalObj => {
        return fetch("https://mec-kennels-api.herokuapp.com/animals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animalObj)
        })
        .then(getAnimals)
    }

    const updateAnimal = animal => {
        return fetch(`https://mec-kennels-api.herokuapp.com/animals/${animal.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(animal)
        })
          .then(getAnimals)
      }

    const releaseAnimal = animalId => {
        return fetch(`https://mec-kennels-api.herokuapp.com/animals/${animalId}`, {
            method: "DELETE"
        })
            .then(getAnimals)
    }

    return (
        <AnimalContext.Provider value={{
            animals, getAnimals, addAnimal, getAnimalById, updateAnimal, releaseAnimal, searchTerms, setSearchTerms
        }}>
            {props.children}
        </AnimalContext.Provider>
    )
}