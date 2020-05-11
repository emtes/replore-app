# Replore

Explore federal repositories - React project

## Purpose

Replore is a React application built in just 5 days that allows you to explore federal repositories indexed by [Code.gov](https://www.code.gov/) with a friendly interface.

## Technologies Used

- React
- Jest
- react-bootstrap
- Express
- Eslint
- Nodemon

## API Endpoints

These are the API endpoints I used for this project. For more information see the [API Docs](https://open.gsa.gov/api/codedotgov/).

- `/repos`: this endpoint will let you query all federal repositories that have been indexed by Code.gov.
  Try it here: [https://api.code.gov/repos?api_key=DEMO_KEY]()

- `/languages`: lists the repositories’ tagged languages and the count of repositories using the language.
  Try it here: [https://api.code.gov/languages?api_key=DEMO_KEY]()

- With more time I would have loved to implement a way to explore open tasks for people looking to contribute right away. Here is the end point for those: [https://api.code.gov/open-tasks?api_key=DEMO_KEY]()
