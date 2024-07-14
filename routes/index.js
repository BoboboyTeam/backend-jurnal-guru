const express = require('express')
const router = express.Router()

// Middleware
const {authentication} = require('../middleware/authentication')
const Authorization = require('../middleware/authorization')

// Controller
const ClassController = require('../controllers/classController')
const AuthController = require('../controllers/authController')
const JournalController = require('../controllers/journalController')
const mapelController = require('../controllers/mapelController')
const JPController = require('../controllers/jpController')
const userController = require('../controllers/userController')

// Login Register
router.post('/login',AuthController.login)
router.post('/register',AuthController.register)

router.use(authentication)

// Utility
router.get('/classes',ClassController.getAllClass)
router.get('/mapels',mapelController.getAllMapel)
router.get('/jps',JPController.getAllJP)

// Admin Role
router.get('/admin/journals',Authorization.admin,JournalController.getAllJournal)
router.get('/admin/users',Authorization.admin,userController.getAllUser)
router.post('/admin/journals',Authorization.admin,JournalController.createJournal)
router.get('/admin/journals/:id',Authorization.admin,JournalController.getJournalById)

// Teacher Role
router.get('/teacher/journals',Authorization.teacher,JournalController.getAllJournal)
router.post('/teacher/journals',Authorization.teacher,JournalController.createJournal)
router.get('/teacher/journals/:id',Authorization.teacher,JournalController.getJournalById)
router.put('/teacher/journals/:id',Authorization.teacher,JournalController.updateJournal)
router.delete('/teacher/journals/:id',Authorization.teacher,JournalController.deleteJournal)

module.exports = router