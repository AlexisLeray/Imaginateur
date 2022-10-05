import express from 'express'
import fs from 'fs'
import addUserSubmit from '../controller/addUser.js'
import connexion from '../controller/connexion.js'
import getMessage from '../controller/adminMessage.js'
import  sendMessage from '../controller/contact.js'
const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL= `${host}:${port}`
const router = express.Router()

// router.get("/api/", homeController)

// router.get("/api/register", addUser)

router.post("/api/register", addUserSubmit)
router.post("/api/connexion", connexion)

router.get("/api/getMessage", getMessage)
router.post("/api/contact", sendMessage)




export default router