# Travlr Getaways (CS 465 Full Stack Development I)

A MEAN stack project for Travlr Getaways. It has a customer-facing website, a REST API, and an Angular admin single-page application (SPA) for managing trips.

## Architecture

- **MongoDB Atlas**: cloud database (`travlr` database, `trips` collection)
- **Mongoose**: schema and database access
- **Express and Node.js**: web server and REST API
- **Handlebars (hbs)**: server-rendered customer pages
- **Angular 17**: admin SPA with reusable components

## Project structure

    app.js                 Express app setup, routes, CORS for the API
    bin/www                Server start script
    app_server/            Customer-facing site (routes, controllers, views)
    app_api/               REST API
      controllers/trips.js   Trip CRUD logic
      models/                db.js, travlr.js (schema), seed.js
      routes/index.js        API routes
    app_admin/             Angular admin SPA
      src/app/
        trip-listing/        Lists all trips
        trip-card/           One trip card (Edit and Delete buttons)
        add-trip/            Add trip form
        edit-trip/           Edit trip form
        services/trip-data.service.ts   HTTP calls to the API
        models/trip.ts       Trip interface
    data/trips.json        Seed data
    public/                Static files and images

## REST API

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /api/trips | List all trips |
| GET | /api/trips/:tripCode | Get one trip by code |
| POST | /api/trips | Add a trip |
| PUT | /api/trips/:tripCode | Update a trip |
| DELETE | /api/trips/:tripCode | Delete a trip |

## Running locally

1. Install dependencies in the project root:

        npm install

2. Set the MongoDB Atlas connection string in the same PowerShell window (do not commit it):

        $env:DB_HOST = "your-atlas-connection-string"

3. Seed the database (first time only):

        node app_api/models/seed.js

4. Start the Express server and API on port 3000:

        npm start

5. In a second window, start the Angular admin app on port 4200:

        cd app_admin
        npm install
        ng serve

6. Open http://localhost:3000/travel for the customer site and http://localhost:4200 for the admin app.

## Branches

Each course module is on its own branch (`module1` through `module6`).

## Testing

- The API was tested with Postman and the browser.
- The Angular app was tested by adding, editing, and deleting trips through the admin interface.
