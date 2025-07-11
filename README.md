# Theatre Franchise System
A fullstack project with many features to support functionality that are needed to run a Frachised - cinema theatre.
The features are made based on the different actors that are available on the system<br>
**This Project is still on development - Steps 3/7**
## Features
The list of features on this project will be based on the available roles and their authorization

- Franchise Admin
  - Create and managing Theatre Layout
  - Create and manging active movies
  - Create and managing new Franchisee
  - Access to each franchisee logs
  - Access to each franchisee ticket history
- Franchisee Admin
  - Creating and managing its own movie cinemas
  - Creating and managing movie show schedules
  - Create and Managing employee work schedule
-Franchisee Employee
  - Basic login for offline transaction
  - Transaction logs
  - Read Schedule
- User
  - Able to do transation online with the frontend
 
- Auth Features
  - RBAC on API
- Helper Feature
  - Autogenerate data helper made with Faker
 
  ## Built With
  Here are some of the major framework i used to build this project
* ![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)
* ![Material-UI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
* ![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=fff&style=flat)
* ![.NET](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)
* ![Postgre](https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white)

## Getting Started
To run this project you will need 
* NPM
* clone this project 
```bash
  https://github.com/kennylisal/Theatre-Franchise-System.git
```

### Installation
These are the steps to install the dependencies for the project
1. Got to the project directory.
2. Run Docker
```bash
  cd api
  docker-compose up
```
3. Open new terminal on the project directory. For more command, check `package.json`
```bash
  npm run install:all
  npm run build
```
4. When the project is done building
```bash
  npm run start
```

## Roadmap
Here are the list of steps to build all the features and finish the project
- [x] Create SQL table for all model
- [X] Create the main framework of the API
    - [X] Create the folder strcuture
    - [X] Centralized error handler
    - [X] Create query and body request validation with middleware
    - [X] Create Interface for api request and response
    - [X] Implement Authorization as middleware
    - [X] Set cookie implementation for authorization 
- [x] Prototype frontend for each corespond user feature
    - [X] Establish theme
    - [X] Create Route strcuture for the frontend
    - [X] Establish Read and Create view pattern
    - [X] Establish connection method to backend
- [ ] Implement RBAC authorization
    - [ ] Establish new API strcuture to accomodate
    - [ ] implement new Middelware for this
- [ ] Implement all the API endpoint
    - [ ] All the Franchise Admin Endpoint
    - [ ] All the Franchise Admin Endpoint
    - [ ] All the Franchisee Admin Endpoint
    - [ ] All the Franchisee employee Endpoint
    - [ ] All the user endpoint
- [ ] Implement all the Frontend view
    - [ ] All the Franchise Admin views
    - [ ] All the Franchise Admin views
    - [ ] All the Franchisee Admin views
    - [ ] All the Franchisee employee views
    - [ ] All the user views
- [ ] Integrate a payment gateway for online transaction
### Contact me
Email : kennylisal5@gmail.com <br>
Linkedin : https://www.linkedin.com/in/kenny-handy-lisal/
