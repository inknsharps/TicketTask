const rsvpButton = document.querySelectorAll(".reserve-button");

const createTicket = async (event) => {
    event.stopPropagation();

    const userId = document.querySelector(".search-results").getAttribute("data-userId");
    const eventId = event.target.parentElement.getAttribute("data-eventId");

    console.log(userId);
    console.log(eventId);

    const ticketResponse = await fetch(`/api/tickets/${userId}/${eventId}`, {
        method: "POST",
        body: JSON.stringify({ userId, eventId }),
        headers: { "Content-Type": "application/json" }
    });
    const ticketData = await ticketResponse.json()
    console.log(ticketData);
};

rsvpButton.forEach((button) => {
    button.addEventListener("click", createTicket);
});