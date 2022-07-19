// ************************************************ USERS RELATED ENDPOINTS ***************************************************

/* *********************************************** USERS CRUD ENDPOINTS *******************************************************

1. CREATE --> POST http://localhost:3001/users/ (+body)
2. READ --> GET http://localhost:3001/users/
3. READ (single user) --> GET http://localhost:3001/users/:userId 
4. UPDATE (single user) --> PUT http://localhost:3001/users/:userId (+body)
5. DELETE (single user) --> DELETE http://localhost:3001/users/:userId

*/

import express from "express" // 3RD PARTY MODULE (npm i express)
import fs from "fs" // CORE MODULE (no need to install!)
import { fileURLToPath } from "url" // CORE MODULE
import { dirname, join } from "path" // CORE MODULE
import uniqid from "uniqid"

const usersRouter = express.Router() // a router is a set of similar endpoints grouped together

// ***************************** HOW TO GET users.json PATH *******************************

// target --> C:\Epicode\WebDev\2022\wd0222\U4-W1\epicode-u4-d2-express-crud\src\apis\users\users.json

// 1. We gonna start from the current's file path --> C:\Epicode\WebDev\2022\wd0222\U4-W1\epicode-u4-d2-express-crud\src\apis\users\index.js
// console.log("CURRENT FILE URL: ", import.meta.url)
// console.log("CURRENT FILE PATH: ", fileURLToPath(import.meta.url))

// 2. We can then obtain the parent's folder path --> C:\Epicode\WebDev\2022\wd0222\U4-W1\epicode-u4-d2-express-crud\src\apis\users\
// console.log("PARENT FOLDER PATH: ", dirname(fileURLToPath(import.meta.url)))
// 3. We can concatenate /users/ folder path with "users.json" --> C:\Epicode\WebDev\2022\wd0222\U4-W1\epicode-u4-d2-express-crud\src\apis\users\users.json
const usersJSONPath = join(dirname(fileURLToPath(import.meta.url)), "users.json") // Please do NOT use "+" to concatenate 2 paths together. The RIGHT WAY is to use JOIN
// console.log("TARGET: ", usersJSONPath)

// ****************************************************************************************

// 1. CREATE --> POST http://localhost:3001/users/ (+body)
usersRouter.post("/", (req, res) => {
  // 1. Read the request body to obtain new user's data
  console.log("BODY: ", req.body) // remember to add express.json() into the main server configuration!!

  // 2. Add some server generated informations (unique id, createdAt,...)
  const newUser = { ...req.body, createdAt: new Date(), id: uniqid() }
  console.log("NEW USER: ", newUser)

  // 3. Read the content of users.json file (obtaining an array)
  const usersArray = JSON.parse(fs.readFileSync(usersJSONPath))

  // 4. Push new user to the array
  usersArray.push(newUser)

  // 5. Write the array back on the file

  fs.writeFileSync(usersJSONPath, JSON.stringify(usersArray)) // We cannot pass an array here as a second argument

  // 6. Send a proper response

  res.status(201).send({ id: newUser.id })
})

// 2. READ --> GET http://localhost:3001/users/
usersRouter.get("/", (req, res) => {
  // 1. Read the content of users.json file
  const fileContent = fs.readFileSync(usersJSONPath) // Here you obtain a BUFFER object, which is MACHINE READABLE ONLY
  // 2. Obtain an array from that file
  const usersArray = JSON.parse(fileContent)
  // console.log("FILE CONTENT: ", usersArray) // JSON.parse() buffer --> array
  // 3. Send back the array as a response

  res.send(usersArray)
})

// 3. READ (single user) --> GET http://localhost:3001/users/:userId
usersRouter.get("/:userId", (req, res) => {
  // 1. Obtain the User Id from the URL
  const userID = req.params.userId

  // 2. Read the file --> obtaining an array
  const usersArray = JSON.parse(fs.readFileSync(usersJSONPath))

  // 3. Find the specific user in the array
  const foundUser = usersArray.find(user => user.id === userID)
  // 4. Send back a proper response

  res.send(foundUser)
})

// 4. UPDATE (single user) --> PUT http://localhost:3001/users/:userId (+body)
usersRouter.put("/:userId", (req, res) => {
  res.send({ message: "Hello I am the UPDATE endpoint!" })
})

// 5. DELETE (single user) --> DELETE http://localhost:3001/users/:userId
usersRouter.delete("/:userId", (req, res) => {
  // 1. Read the file obtaining an array
  const usersArray = JSON.parse(fs.readFileSync(usersJSONPath))

  // 2. Filter out the specified user from the array, keeping just the array of the remaining users
  const remainingUsers = usersArray.filter(user => user.id !== req.params.userId)

  // 3. Save the array of remaining users back on disk
  fs.writeFileSync(usersJSONPath, JSON.stringify(remainingUsers))

  // 4. Send a proper response
  res.status(204).send()
})

export default usersRouter // do not forget to export it!
