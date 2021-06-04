import React, { useContext, useState, useEffect } from "react"
import { LocationContext } from "../location/LocationProvider"
import "./Location.css"
import { useHistory, useParams } from 'react-router-dom';

export const LocationForm = () => {
    const { getLocationById, updateLocation, addLocation } = useContext(LocationContext);
    const [location, setLocation] = useState({});
    const history = useHistory();
    const { locationId } = useParams();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (locationId) {
            getLocationById(parseInt(locationId))
                .then(location => {
                    setLocation(location)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    const handleControlledInputChange = (event) => {
        const newLocation = { ...location }
        newLocation[event.target.id] = event.target.value
        setLocation(newLocation)
    }

    const handleSaveLocation = () => {
        setIsLoading(true)
        if (locationId) {
            updateLocation({
                id: location.id,
                name: location.name,
                address: location.address
            })
            .then(() => history.push(`/locations/detail/${location.id}`))
        } else {
            addLocation({
                name: location.name,
                address: location.address
            })
            .then(() => history.push("/locations"))
        }
    }


    return (
        <form className="locationForm">
            <h2 className="locationForm__title">New Location</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Location name:</label>
                    <input type="text" id="name" required autoFocus className="form-control" placeholder="Location name" value={location.name} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" required autoFocus className="form-control" placeholder="Address name" value={location.address} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <button className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    handleSaveLocation()
                }}>
                {locationId ? <>Save Location</> : <>Add Location</>}
            </button>
        </form>
    )
}