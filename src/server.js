// const express = require("express") // OLD SYNTAX (we don't want to use old stuff)
import express from "express" // NEW SYNTAX (you can use this only if type:"module" is added on package.json)
import usersRouter from "./apis/users/index.js"

const server = express()

const port = 3001

// **************************************** ENDPOINTS ************************************
server.use("/users", usersRouter) // /users will be the prefix that all the endpoints in the usersRouter will have
// server.use("/books", booksRouter)

server.listen(port, () => {
  console.log("Server is running on port: ", port)
})
