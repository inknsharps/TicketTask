const newFormHandler = async (event) => {
    event.preventDefault();
  
    const eventName = document.querySelector('#project-name').value.trim();
    const ticketNo = document.querySelector('#project-funding').value.trim();
    const location = document.querySelector('#project-desc').value.trim();
      
    if (eventName && ticketNo && location) {
    const response = await fetch(`/api/events`, {
        method: 'POST',
        body: JSON.stringify({ eventName, eventDate, eventPrice, userId, locationId }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
      
        if (response.ok) {
            document.location.replace('/profile');
        }   else {
            alert('Failed to create event');
          }
        }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
      