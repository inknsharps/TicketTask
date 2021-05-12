const newEventForm = document.querySelector(".create-new-event");

const createEvent = async (event) => {
    event.preventDefault();

    // Event date will be in the form
    const eventDetails = {
        eventName: document.querySelector("#event-name").value,
        eventDate: document.querySelector("#event-date").value,
        eventPrice: parseInt(document.querySelector("#event-price").value),
        userId: parseInt(event.target.getAttribute("data-userId"))
    }
    console.log(eventDetails)
    const locationDetails = {
        streetAddress: document.querySelector("#event-address").value,
        city: document.querySelector("#event-city").value,
        postalCode: parseInt(document.querySelector("#event-postalcode").value),
        state: document.querySelector("#event-state").value,
        country: document.querySelector("#event-country").value
    }
    console.log(locationDetails)
    
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

    const eventName = document.querySelector(".event-name");
    const eventDate = document.querySelector(".event-date");
    const eventPrice = document.querySelector(".event-price");

    const locationId = document.querySelector(".location-id");

    const response = await fetch(`/api/events/${postId}`, {
        method: "PUT",
        body: JSON.stringify({ eventName, eventDate, eventPrice, locationId }),
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert("Failed to update event.");
    }
};

const deleteEvent = async (event) => {
    event.stopPropagation();

    const eventId = document.querySelector(".event-id");
    const response = await fetch(`/api/posts/${eventId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert("Failed to delete post.");
    }
};

newEventForm.addEventListener("submit", createEvent);