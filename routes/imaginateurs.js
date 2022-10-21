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
import {showToUpdate, update} from '../controller/updateProduct.js'
import newCategory from '../controller/newCategory.js'
import {toApproved, validate} from '../controller/toApproved.js'
import {showCreator, creatorInfo} from '../controller/creator.js'
import {showShop, shop} from '../controller/shop.js'
import showBasket from '../controller/shoppingCart.js'
import {payment, sold} from '../controller/payment.js'
import {addArticle, getArticle} from '../controller/articles.js'
import withoutPictures from '../controller/articleText.js'
import deleteArticle from '../controller/deleteArticle.js'
const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL= `${host}:${port}`
const router = express.Router()


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
router.get("/api/updateProduct/:id", showToUpdate)
router.post("/api/updateProduct/:id", update)
router.post("/api/newCategory" , newCategory)

router.get("/api/toApproved/", toApproved)
router.post("/api/toApproved/", validate)

router.get("/api/creator/:id", showCreator)
router.post("/api/creator/:id", creatorInfo)

router.get("/api/shop/", showShop)
router.post("/api/shop/", shop)

router.get("/api/panier/:id", showBasket)
router.get("/api/payment/:id", payment)
router.post("/api/payment/:id", sold)

router.post("/api/article", addArticle)
router.post("/api/articleTexte", withoutPictures)
router.get("/api/article", getArticle)

router.post("/api/deleteArticle", deleteArticle)

export default router