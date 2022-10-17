import express from 'express'
import fs from 'fs'
import addUserSubmit from '../controller/addUser.js'
import connexion from '../controller/connexion.js'
import getMessage from '../controller/adminMessage.js'
import  sendMessage from '../controller/contact.js'
import newCreator from '../controller/newCreator.js'
import addCreator from '../controller/addCreator.js'
import {addPiece, getGategory} from '../controller/addPiece.js'
import myGalery from '../controller/myGalery.js'
import deleteProduct from '../controller/deleteProduct.js'
// import deletePost from '../controller/deleteProduct.js'
import {showToUpdate, update} from '../controller/updateProduct.js'
// import showToUpdate from '../controller/updateProduct.js'
import newCategory from '../controller/newCategory.js'
import toApprouved from '../controller/toApprouved.js'
const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL= `${host}:${port}`
const router = express.Router()

// router.get("/api/", homeController)

// router.get("/api/register", addUser)

router.post("/api/register", addUserSubmit)
router.post("/api/connexion", connexion)

router.get("/api/admin/getMessage", getMessage)
router.post("/api/contact", sendMessage)

router.get("/api/admin/newCreator", newCreator)
router.post("/api/admin/addCreator", addCreator)

router.post("/api/newPiece", addPiece)
router.get("/api/newPiece", getGategory)
router.get("/api/myGalery/:id", myGalery)

router.post("/api/deleteProduct", deleteProduct)
// router.post("/api/deletePost", deletePost)
router.get("/api/updateProduct/:id", showToUpdate)
router.post("/api/updateProduct/:id", update)
router.post("/api/newCategory" , newCategory)
router.get("/api/toApprouved", toApprouved)




export default router