// Middleware
import authentication from '../middleware/authentication.js';
import Authorization from '../middleware/authorization.js';

// Controller
import AuthController from '../controllers/AuthController.js';
import UserController from '../controllers/userController.js';
import JPController from '../controllers/jpController.js';
import KelasController from '../controllers/kelasController.js';
import { filterByDay } from '../middleware/filterByDay.js';

import express from 'express';
import JurnalGuruController from '../controllers/jurnalGuruController.js';
import errHandler from '../middleware/errorHandling.js';
import filterByRange from '../middleware/filterByRange.js';

const router = express.Router();

router.post('/pub/register', AuthController.register);
router.get('/get-role', authentication,(req,res)=>{
    res.status(200).json({role: req.user.role});
})

// Auth
router.post('/login', AuthController.login);
router.post('/register',AuthController.register);

// Admin
// Profile
router.get('/admin/profile', authentication, Authorization.admin, UserController.findSelf);

// Get Guru
router.get('/users/role/:role', authentication, UserController.findAllByRole);
// Users
router.get('/admin/users', authentication, Authorization.admin, UserController.findAll);
router.get('/admin/users/:id', authentication, Authorization.admin, UserController.findOne);
router.post('/admin/users', authentication, Authorization.admin, UserController.create);
router.put('/admin/users/:id', authentication, Authorization.admin, UserController.updateOne);
router.delete('/admin/users/:id', authentication, Authorization.admin, UserController.deleteOne);

// JP
router.get('/admin/jp',filterByDay, authentication, Authorization.admin, JPController.findAll);
router.get('/admin/jp/:id', authentication, Authorization.admin, JPController.findOne);
router.post('/admin/jp', authentication, Authorization.admin, JPController.create);
router.put('/admin/jp/:id', authentication, Authorization.admin, JPController.updateOne);
router.delete('/admin/jp/:id', authentication, Authorization.admin, JPController.deleteOne);


// Kelas
router.get('/kelas', KelasController.findAll);
router.get('/kelas/:id', KelasController.findOne);
router.post('/admin/kelas', authentication, Authorization.admin, KelasController.create);
router.put('/admin/kelas/:id', authentication, Authorization.admin, KelasController.updateOne);
router.delete('/admin/kelas/:id', authentication, Authorization.admin, KelasController.deleteOne);

// Jurnal Guru
router.get('/admin/jurnal-guru', authentication, Authorization.admin, JurnalGuruController.findAll);
router.get('/admin/jurnal-guru/:id', authentication, Authorization.admin, JurnalGuruController.findOne);
router.post('/admin/jurnal-guru', authentication, Authorization.admin, JurnalGuruController.create);
router.put('/admin/jurnal-guru/:id', authentication, Authorization.admin, JurnalGuruController.updateOne);
router.delete('/admin/jurnal-guru/:id', authentication, Authorization.admin, JurnalGuruController.deleteOne);

router.get('/admin/filter/jurnal-guru/date/:id',authentication, Authorization.admin, JurnalGuruController.findAllByRangeDate);
router.get('/admin/filter/jurnal-guru/date',authentication, Authorization.admin, JurnalGuruController.findAllByRangeDate);
router.get('/admin/filter/jurnal-guru/guru/:id',authentication, Authorization.admin, JurnalGuruController.findAllByGuruId);

// guru
// Profile
router.get('/guru/profile', authentication, Authorization.guru, UserController.findSelf);
// router.get('/guru/filter/jurnal-guru/guru/:id',authentication, Authorization.guru, JurnalGuruController.findAllByGuruId);
router.get('/guru/filter/jurnal-guru/date/:id',authentication, Authorization.guru, JurnalGuruController.findAllByRangeDate);
router.get('/guru/filter/jurnal-guru/date',authentication, Authorization.guru, JurnalGuruController.findAllByRangeDate);
// JP
router.get('/guru/jp', filterByDay,authentication, Authorization.guru, JPController.findAll);
router.get('/guru/jp/:id', filterByDay,authentication, Authorization.guru, JPController.findOne);

// Jurnal Guru
router.get('/guru/jurnal-guru/now',filterByRange,authentication, Authorization.guru, JurnalGuruController.findNow);
router.get('/guru/filter/jurnal-guru/date',authentication, Authorization.guru, JurnalGuruController.findAllByRangeDate);
router.get('/guru/jurnal-guru',authentication, Authorization.guru, JurnalGuruController.findAll);
router.get('/guru/jurnal-guru/:id',authentication, Authorization.guru, JurnalGuruController.findOne);
router.post('/guru/jurnal-guru',authentication, Authorization.guru, JurnalGuruController.create);
router.put('/guru/jurnal-guru/:id',authentication, Authorization.guru, JurnalGuruController.updateOne);
router.delete('/guru/jurnal-guru/:id',authentication, Authorization.guru, JurnalGuruController.deleteOne);

// Error Handler

router.use(errHandler);

export default router;
