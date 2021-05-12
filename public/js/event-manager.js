const createEvent = async (event) => {
    event.stopPropagation();

    // Event date will be in the form
    const eventName = document.querySelector(".event-name");
    const eventDate = document.querySelector(".event-date");
    const eventPrice = document.querySelector(".event-price");
    // User Id can be hidden somewhere on the page
    const userId = document.querySelector(".user-id");
    // Where to hide the location id...
    const locationId = document.querySelector(".location-id");

    const response = await fetch(`/api/events/`, {
        method: "POST",
        body: JSON.stringify({ eventName, eventDate, eventPrice, userId, locationId }),
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        document.location.reload()
    } else {
        alert("500 Server Error.");
    };
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