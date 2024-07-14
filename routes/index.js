import express from 'express';

const router = express.Router();

// Middleware
import { authentication } from '../middleware/authentication';
import { admin, teacher } from '../middleware/authorization';

// Controller
import AuthController from '../controllers/AuthController';
import UserController from '../controllers/userController';
import JPController from '../controllers/jpController';
import KelasController from '../controllers/kelasController';
import { filterByNow } from '../middleware/filterByNow';

// Auth
router.post('/login', AuthController.login);
router.post('/register',authentication,admin, AuthController.register);

// Admin

// Users
router.get('/users', authentication, admin, UserController.findAll);
router.get('/users/:id', authentication, admin, UserController.findOne);
router.post('/users', authentication, admin, UserController.create);
router.put('/users/:id', authentication, admin, UserController.updateOne);
router.delete('/users/:id', authentication, admin, UserController.deleteOne);

// JP
router.get('/admin/jp', authentication, admin, JPController.findAll);
router.get('/admin/jp/:id', authentication, admin, JPController.findOne);
router.post('/admin/jp', authentication, admin, JPController.create);
router.put('/admin/jp/:id', authentication, admin, JPController.updateOne);
router.delete('/admin/jp/:id', authentication, admin, JPController.deleteOne);

// Kelas
router.get('/admin/kelas', authentication, admin, KelasController.findAll);
router.get('/admin/kelas/:id', authentication, admin, KelasController.findOne);
router.post('/admin/kelas', authentication, admin, KelasController.create);
router.put('/admin/kelas/:id', authentication, admin, KelasController.updateOne);
router.delete('/admin/kelas/:id', authentication, admin, KelasController.deleteOne);

// Teacher

// JP
router.use(filterByNow)
router.get('/teacher/jp', authentication, teacher, JPController.findAll);


export default router;
