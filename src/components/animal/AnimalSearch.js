import React, { useContext } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"

export const AnimalSearch = () => {
    const { setSearchTerms } = useContext(AnimalContext)

    return (
        <>
            <div className="animalSearch">
                Animal search:
      <input type="text"
                    className="input--wide"
                    onKeyUp={(event) => setSearchTerms(event.target.value.toLowerCase())}
                    placeholder="Search for an animal... " />
            </div>
        </>
    )
}