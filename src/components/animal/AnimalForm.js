import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import "./Animal.css"
import { useHistory, useParams } from 'react-router-dom';

export const AnimalForm = () => {
  const { addAnimal, updateAnimal, getAnimalById } = useContext(AnimalContext)
  const { locations, getLocations } = useContext(LocationContext)
  const { customers, getCustomers } = useContext(CustomerContext)
  const [animal, setAnimal] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { animalId } = useParams()

  useEffect(() => {
    getCustomers().then(getLocations).then(() => {
      if (animalId) {
        getAnimalById(parseInt(animalId))
          .then(animal => {
            setAnimal(animal)
            setIsLoading(false)
          })
      } else {
        setIsLoading(false)
      }
    })
  }, [])

  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newAnimal = { ...animal }
    /* Animal is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    newAnimal[event.target.id] = event.target.value
    // update state
    setAnimal(newAnimal)
  }

  const handleSaveAnimal = () => {
    if (parseInt(animal.locationId) === 0 || parseInt(animal.customerId) === 0) {
      window.alert("Please select a location and a customer")
    } else {
      //disable the button - no extra clicks
      setIsLoading(true);
      if (animalId) {
        updateAnimal({
          id: parseInt(animalId),
          name: animal.name,
          breed: animal.breed,
          locationId: parseInt(animal.locationId),
          customerId: parseInt(animal.customerId)
        })
          .then(() => history.push(`/animals/detail/${parseInt(animalId)}`))
      } else {
        addAnimal({
          name: animal.name,
          breed: animal.breed,
          locationId: parseInt(animal.locationId),
          customerId: parseInt(animal.customerId)
        })
          .then(() => history.push("/animals"))
      }
    }
  }

  return (
    <form className="animalForm">
      <h2 className="animalForm__title">New Animal</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Animal name:</label>
          <input type="text" id="name" required autoFocus className="form-control" placeholder="Animal name" value={animal.name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Animal breed:</label>
          <input type="text" id="breed" required autoFocus className="form-control" placeholder="Animal breed" value={animal.breed} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Assign to location: </label>
          <select name="locationId" id="locationId" className="form-control" value={animal.locationId} onChange={handleControlledInputChange}>
            <option value="0">Select a location</option>
            {locations.map(l => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="customerId">Customer: </label>
          <select name="customer" id="customerId" className="form-control" value={animal.customerId} onChange={handleControlledInputChange}>
            <option value="0">Select a customer</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button className="btn btn-primary"
        disabled={isLoading}
        onClick={event => {
          event.preventDefault() // Prevent browser from submitting the form and refreshing the page
          handleSaveAnimal()
        }}>
        {animalId ? <>Save Animal</> : <>Add Animal</>}
      </button>
    </form>
  )
}