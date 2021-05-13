# project_2

## Description

The CMS Event Registration app illustrates how developers can use modern frontend and backend technologies like node js, mysql, handlebars, and much more to build a function web applications. This app not only allows a user to search and get tickets for an event, but also create their own event for people to attend. Users can manage events, create event sign ups, create, and sign into an account. A deployed version of this is on Heroku linked here.

## Installation

1) Clone repository, then navigate to the folder locally and run:
```
    npm install
```
2) Create and save a `.env` file in the root directory, and include the following information:
```
    DB_NAME=
    DB_USER=
    DB_PASS=
    SECRET=
```

## Usage

Before trying the following, make sure to seed the database, and create a new account and log into it (the seed database files currently don't encrypt the password so you won't be able to log into the seeded accounts).

### CRUD Events

Click "Dashboard" in the navbar.
On the dashboard page, you should see all the events that you've made, and events that you've RVSP'd to (if you made a new account, it shows nothing).
You can create a new event through the form on the bottom NOTE: Event Price needs to just be a number, and Event Date needs to be in YYYY-MM-DD format for the moment.
Any events that you made can be updated by clicking on the text, changing it, then clicking the "Update" button.
You can also delete events by clicking the "Delete" button.

### Ticketing and Emailing Tickets

Click "Find Event" in the navbar.
Type in a city and submit the search, you should see all the events that match that city.
There should now be a button that says RSVP. When you click on it, it will create a new entry in the DB for Ticket linking your logged in user ID to the event ID.
Now when you go to your dashboard, you should see your ticketed events. You can send an email via how you set up the nodemailer transporter by clicking the button.

## Demo