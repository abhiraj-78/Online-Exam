import express from 'express'
import { signUp ,signIn } from '../Controller/user.controller.js'
import { body } from 'express-validator'
const router = express.Router()

router.post('/signUp',body('name').notEmpty().withMessage('please enter name'),                        
                    body("email").isEmail().withMessage('please enter email'),
                    body('password').isLength({min:6}).withMessage("password must be at least 6 character").isAlphanumeric().
                    withMessage("password must contain letter and number"),
                    body('userType').notEmpty().withMessage("please enter type")
                    ,signUp)

router.post('/signIn',body('email').isEmail().withMessage('Enter valid email'),signIn)


export default router ;