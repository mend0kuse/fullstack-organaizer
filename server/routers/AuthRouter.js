import Router from 'express'
export const routerAuth = Router()

import AuthConroller from '../controllers/authController.js'



routerAuth.post('/registration', AuthConroller.registration)
routerAuth.post('/login', AuthConroller.login)


