import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"
import { Link, useHistory } from "react-router-dom"

export const AnimalList = () => {
  const { getAnimals, animals } = useContext(AnimalContext)

  // Initialization effect hook -> Go get animal data
  useEffect(() => {
    getAnimals()
  }, [])

  const history = useHistory()
  
  return (
    <>
      <h1>Animals</h1>

      <button onClick={() => history.push("/animals/create")}>
        Make Reservation
            </button>

      <div className="animals">
        {
          animals.map(animal => {
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
    </>
  )
}