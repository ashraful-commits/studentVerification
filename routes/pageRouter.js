const express = require('express');

const {
  allStudent,
  createStudent,
  editStudent,
  showStudent,
  addstudent,
  deleteStudent,
  updateStudent,
  unverified_stu,
  cellpage,
  cellverification,
  emailverification,
} = require('../controllers/pageControllers');
const { studentphotoMulter } = require('../middlewars/middlerwares');

//===============================================================//  init router
const router = express();
//=============================================================// use router
router.get('/', allStudent);
router.get('/unverified', unverified_stu);

router.post('/create', studentphotoMulter, addstudent);
router.get('/create', createStudent);
router.get('/delete/:id', deleteStudent);
router.get('/show/:id', showStudent);
router.get('/edit/:id', editStudent);
router.post('/update/:id', studentphotoMulter, updateStudent);
router.get('/:token', emailverification);
router.get('/unverified/:otp', cellpage);
router.post('/unverified/:otp', cellverification);
//===============================================================// export router
module.exports = router;
