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
import JurnalGuruController from '../controllers/jurnalGuruController.js';
import errHandler from '../middleware/errorHandling.js';

const router = express.Router();

router.post('/pub/register', AuthController.register);


// Auth
router.post('/login', AuthController.login);
router.post('/register',authentication,Authorization.admin, AuthController.register);

// Admin

// Users
router.get('/users', authentication, Authorization.admin, UserController.findAll);
router.get('/users/:id', authentication, Authorization.admin, UserController.findOne);
router.post('/users', authentication, Authorization.admin, UserController.create);
router.put('/users/:id', authentication, Authorization.admin, UserController.updateOne);
router.delete('/users/:id', authentication, Authorization.admin, UserController.deleteOne);

// JP
router.get('/admin/jp', authentication, Authorization.admin, JPController.findAll);
router.get('/admin/jp/:id', authentication, Authorization.admin, JPController.findOne);
router.post('/admin/jp', authentication, Authorization.admin, JPController.create);
router.put('/admin/jp/:id', authentication, Authorization.admin, JPController.updateOne);
router.delete('/admin/jp/:id', authentication, Authorization.admin, JPController.deleteOne);

// Kelas
router.get('/admin/kelas', authentication, Authorization.admin, KelasController.findAll);
router.get('/admin/kelas/:id', authentication, Authorization.admin, KelasController.findOne);
router.post('/admin/kelas', authentication, Authorization.admin, KelasController.create);
router.put('/admin/kelas/:id', authentication, Authorization.admin, KelasController.updateOne);
router.delete('/admin/kelas/:id', authentication, Authorization.admin, KelasController.deleteOne);

// Jurnal Guru
router.get('/admin/jurnal-guru', authentication, Authorization.admin, JurnalGuruController.findAll);
router.get('/admin/jurnal-guru/:id', authentication, Authorization.admin, JurnalGuruController.findOne);
router.post('/admin/jurnal-guru', authentication, Authorization.admin, JurnalGuruController.create);
router.put('/admin/jurnal-guru/:id', authentication, Authorization.admin, JurnalGuruController.updateOne);
router.delete('/admin/jurnal-guru/:id', authentication, Authorization.admin, JPController.deleteOne);


// Teacher

// JP
router.use(filterByNow)
router.get('/teacher/jp', authentication, Authorization.teacher, JurnalGuruController.findAll);

// Jurnal Guru
router.get('/teacher/jurnal-guru', authentication, Authorization.teacher, JurnalGuruController.findAll);
router.get('/teacher/jurnal-guru/:id', authentication, Authorization.teacher, JurnalGuruController.findOne);
router.post('/teacher/jurnal-guru', authentication, Authorization.teacher, JurnalGuruController.create);
router.put('/teacher/jurnal-guru/:id', authentication, Authorization.teacher, JurnalGuruController.updateOne);
router.delete('/teacher/jurnal-guru/:id', authentication, Authorization.teacher, JPController.deleteOne);

router.use(errHandler);

export default router;
