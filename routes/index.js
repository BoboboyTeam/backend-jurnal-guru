// Middleware
import authentication from '../middleware/authentication.js';
import Authorization from '../middleware/authorization.js';

// Controller
import AuthController from '../controllers/AuthController.js';
import UserController from '../controllers/userController.js';
import JPController from '../controllers/jpController.js';
import KelasController from '../controllers/kelasController.js';
import { filterByNow } from '../middleware/filterByNow.js';

import express from 'express';

const router = express.Router();


// Auth
router.post('/login', AuthController.login);
router.post('/register',authentication,Authorization.admin, AuthController.register);

// Public Test

// router.get('/pub/users', UserController.findAll);
// router.post('/pub/users', UserController.create);

// Admin

// Users
router.get('/users', authentication, Authorization.admin, UserController.findAllByPage);
router.get('/users/:id', authentication, Authorization.admin, UserController.findOne);
router.post('/users', authentication, Authorization.admin, UserController.create);
router.put('/users/:id', authentication, Authorization.admin, UserController.updateOne);
router.delete('/users/:id', authentication, Authorization.admin, UserController.deleteOne);

// JP
router.get('/admin/jp', authentication, Authorization.admin, JPController.findAllByPage);
router.get('/admin/jp/:id', authentication, Authorization.admin, JPController.findOne);
router.post('/admin/jp', authentication, Authorization.admin, JPController.create);
router.put('/admin/jp/:id', authentication, Authorization.admin, JPController.updateOne);
router.delete('/admin/jp/:id', authentication, Authorization.admin, JPController.deleteOne);

// Kelas
router.get('/admin/kelas', authentication, Authorization.admin, KelasController.findAllByPage);
router.get('/admin/kelas/:id', authentication, Authorization.admin, KelasController.findOne);
router.post('/admin/kelas', authentication, Authorization.admin, KelasController.create);
router.put('/admin/kelas/:id', authentication, Authorization.admin, KelasController.updateOne);
router.delete('/admin/kelas/:id', authentication, Authorization.admin, KelasController.deleteOne);

// Teacher

// JP
router.use(filterByNow)
router.get('/teacher/jp', authentication, Authorization.teacher, JPController.findAll);
router.get('/teacher/jp/:id', authentication, Authorization.teacher, JPController.findOne);
router.post('/teacher/jp', authentication, Authorization.teacher, JPController.create);
router.put('/teacher/jp/:id', authentication, Authorization.teacher, JPController.updateOne);


export default router;
