// This script creates a new ticket by sending a POST request to the backend.
// Remeber that the link between user and event through tickets are DIFFERENT than user to event!
const rsvpButton = document.querySelectorAll(".reserve-button");

const createTicket = async (event) => {
    event.stopPropagation();

    const userId = document.querySelector(".search-results").getAttribute("data-userId");
    const eventId = event.target.parentElement.getAttribute("data-eventId");

    const ticketResponse = await fetch(`/api/tickets/${userId}/${eventId}`, {
        method: "POST",
        body: JSON.stringify({ userId, eventId }),
        headers: { "Content-Type": "application/json" }
    });
    if (ticketResponse.ok) {
        alert("Ticket RSVP'd for this event!")
    } else {
        alert("500 Server Error, you must be logged into book a ticket!");
        document.location.replace("/login");
    }
};

rsvpButton.forEach((button) => {
    button.addEventListener("click", createTicket);
});