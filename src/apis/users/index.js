// ************************************************ USERS RELATED ENDPOINTS ***************************************************

/* *********************************************** USERS CRUD ENDPOINTS *******************************************************

1. CREATE --> POST http://localhost:3001/users/ (+body)
2. READ --> GET http://localhost:3001/users/
3. READ (single user) --> GET http://localhost:3001/users/:userId 
4. UPDATE (single user) --> PUT http://localhost:3001/users/:userId (+body)
5. DELETE (single user) --> DELETE http://localhost:3001/users/:userId

*/

import express from "express"

const usersRouter = express.Router() // a router is a set of similar endpoints grouped together

// 1. CREATE --> POST http://localhost:3001/users/ (+body)
usersRouter.post("/", (req, res) => {
  res.send({ message: "Hello I am the POST endpoint!" })
})

// 2. READ --> GET http://localhost:3001/users/
usersRouter.get("/", (req, res) => {
  res.send({ message: "Hello I am the GET endpoint!" })
})

// 3. READ (single user) --> GET http://localhost:3001/users/:userId
usersRouter.get("/:userId", (req, res) => {
  res.send({ message: "Hello I am the GET SINGLE USER endpoint!" })
})

// 4. UPDATE (single user) --> PUT http://localhost:3001/users/:userId (+body)
usersRouter.put("/:userId", (req, res) => {
  res.send({ message: "Hello I am the UPDATE endpoint!" })
})

// 5. DELETE (single user) --> DELETE http://localhost:3001/users/:userId
usersRouter.delete("/:userId", (req, res) => {
  res.send({ message: "Hello I am the DELETE endpoint!" })
})

export default usersRouter // do not forget to export it!
