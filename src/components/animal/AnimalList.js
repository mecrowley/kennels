import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"
import { Link, useHistory } from "react-router-dom"

export const AnimalList = () => {
  const { getAnimals, animals, searchTerms } = useContext(AnimalContext)
  const [filteredAnimals, setFiltered] = useState([])
  const history = useHistory()

  useEffect(() => {
    getAnimals()
  }, [])

  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching animals
      const subset = animals.filter(animal => animal.name.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {
      // If the search field is blank, display all animals
      setFiltered(animals)
    }
  }, [searchTerms, animals])


  return (
    <>
      <h1>Animals</h1>

      <div className="animals">
        {
          filteredAnimals.map(animal => {
            return (
              <>
                <div className="animal">
                  <Link to={`/animals/detail/${animal.id}`}>
                    <h3>{animal.name}</h3>
                  </Link>
                </div>


              </>
            )
          })
        }
      </div>
        <button className="addButton" onClick={() => history.push("/animals/create")}>
          Make Reservation
            </button>
    </>
  )
}