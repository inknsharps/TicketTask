const sendTicketButton = document.querySelectorAll(".send-email");

const sendTicketEmail = async (event) => {
    const eventId = event.target.parentElement.getAttribute("data-eventid");
    const userId = document.querySelector(".user-profile").getAttribute("data-userid");

    const emailResponse = await fetch(`/api/tickets/email/${userId}/${eventId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    if (emailResponse.ok) {
        alert("Email sent!")
    } else {
        alert("500 Server Error.")
    }
};

sendTicketButton.forEach((button) => {
    button.addEventListener("click", sendTicketEmail);
});