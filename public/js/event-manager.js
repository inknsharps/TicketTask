const newEventForm = document.querySelector(".create-new-event");
const updateButton = document.querySelectorAll(".update-button");
const deleteButton = document.querySelectorAll(".delete-button");

const createEvent = async (event) => {
    event.preventDefault();

    const eventDetails = {
        eventName: document.querySelector("#event-name").value,
        eventDate: document.querySelector("#event-date").value,
        eventPrice: parseInt(document.querySelector("#event-price").value),
        userId: parseInt(event.target.getAttribute("data-userId"))
    };
    const locationDetails = {
        streetAddress: document.querySelector("#event-address").value,
        city: document.querySelector("#event-city").value,
        postalCode: parseInt(document.querySelector("#event-postalcode").value),
        state: document.querySelector("#event-state").value,
        country: document.querySelector("#event-country").value
    };   
    // Explanation for this monstrosity:
    // We make a POST request to create a new location.
    // We have to use the .json() method to parse the JSON response into javascript objects (our response on the backend spits out the newly created instance of the Location model as JSON).
    // Then, we use the ID of the new Location as part of another POST request, this time hitting the Events route which creates a new event.
    // Finally, reload the page.
    try {
        const locationResponse = await fetch(`/api/locations`, {
            method: "POST",
            body: JSON.stringify(locationDetails),
            headers: { "Content-Type": "application/json" }
        });
        
        if (locationResponse.ok) {
            const newLocation = await locationResponse.json();

            const eventResponse = await fetch(`/api/events/`, {
                method: "POST",
                body: JSON.stringify({ 
                    locationId: newLocation.id,
                    ...eventDetails
                }),
                headers: { "Content-Type": "application/json" }
            });
            if (eventResponse.ok) {
                document.location.reload();
            }
        }
    } catch (err) {
        alert("500 Server Error.");
    }    
};

// Updates event by event ID
const updateEvent = async (event) => {
    event.stopPropagation();
    
    // Get the event ID from data attribute
    const eventId = event.target.parentElement.getAttribute("data-eventId");
    const locationId = event.target.parentElement.getAttribute("data-locationId");
    
    const updatedLocation = {
        streetAddress: document.querySelector(`.eventId${eventId}-address`).textContent,
        city: document.querySelector(`.eventId${eventId}-city`).textContent,
        postalCode: document.querySelector(`.eventId${eventId}-postalcode`).textContent,
        state: document.querySelector(`.eventId${eventId}-state`).textContent,
        country: document.querySelector(`.eventId${eventId}-country`).textContent
    };

    const updateLocationResponse = await fetch(`/api/locations/${locationId}`, {
        method: "PUT",
        body: JSON.stringify(updatedLocation),
        headers: { "Content-Type": "application/json" }
    });
    if (updateLocationResponse.ok) {
        
        const updatedEvent = {
            eventName: document.querySelector(`.eventId${eventId}-name`).textContent,
            eventDate: document.querySelector(`.eventId${eventId}-date`).textContent,
            eventPrice: document.querySelector(`.eventId${eventId}-price`).textContent,
            locationId: locationId
        };
    
        console.log(updatedEvent);
    
        const updateEventResponse = await fetch(`/api/events/${eventId}`, {
            method: "PUT",
            body: JSON.stringify(updatedEvent),
            headers: { "Content-Type": "application/json" }
        });
        if (updateEventResponse.ok) {
            document.location.reload();
        } else {
            alert("Failed to update event.");
        }
    }
};

const deleteEvent = async (event) => {
    event.stopPropagation();

    const eventId = event.target.parentElement.getAttribute("data-eventId");
    console.log(eventId);
    const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        document.location.alert("updated!");
    } else {
        alert("Failed to delete post.");
    }
};

newEventForm.addEventListener("submit", createEvent);
updateButton.forEach((button) => {
    button.addEventListener("click", updateEvent)
});
deleteButton.forEach((button) => {
    button.addEventListener("click", deleteEvent)
});