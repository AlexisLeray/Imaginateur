import express from 'express'
import fs from 'fs'

const host = "http://alexisleray.sites.3wa.io"
const port = 9300
const BASE_URL= `${host}:${port}`
const router = express.Router()

export default router