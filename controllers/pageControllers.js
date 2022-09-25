const fs = require('fs');
const path = require('path');
const { sendEmail } = require('../utility/sendEmail');
const { sendSms } = require('../utility/sendSms');

//==========================================================> all student
const allStudent = (req, res) => {
  const students = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../db/student.json'))
  );
  const verifiedStu = students.filter(
    (data) => data.Isverified == true
  );
  res.render('student/index', {
    students: verifiedStu,
  });
};
//==========================================================> all student end
//==========================================================> unverified student
const unverified_stu = (req, res) => {
  const students = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../db/student.json'))
  );
  const unverifiedStu = students.filter(
    (data) => data.Isverified == false
  );
  res.render('student/unverified', {
    students: unverifiedStu,
  });
};
//==========================================================> unverified student end
//============================================================> create student
const createStudent = (req, res) => {
  const students = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../db/student.json'))
  );
  res.render('student/create');
};

//============================================================> create student end
//===================================================================> add new student
const addstudent = async (req, res) => {
  const students = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../db/student.json'))
  );
  //=================================================================>otp
  const otp = Math.floor(Math.random() * 1000);
  //=================================================================>token
  const token = Date.now() + Math.floor(Math.random() * 100000);
  //=================================================================> body req data
  const { name, email, cell, photo, location } = req.body;
  //=================================================================> send mail
  await sendEmail(email, 'Success Email', `Hello ${name}`, {
    name,
    email,
    cell,
    token,
    otp,
  });
  //================================================================> send sms
  await sendSms(cell, `Hello ${name}, You got OTP ${otp}`, {
    cell,
    token,
    email,
    name,
    token,
    otp,
  });
  //================================================================> data push
  students.push({
    id: students.length - 1 + 2,
    name: name,
    email: email,
    cell: cell,
    photo: req.file.filename,
    location: location,
    token: token,
    otp: otp,
    Isverified: false,
  });
  //==================================================================> write file
  fs.writeFileSync(
    path.join(__dirname, '../db/student.json'),
    JSON.stringify(students)
  );
  res.redirect('/unverified');
};
//===================================================================> add new student end
//==================================================================> view student
const showStudent = (req, res) => {
  const students = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../db/student.json'))
  );
  const viewStudent = students.find(
    (data) => data.id == req.params.id
  );
  res.render('student/show', {
    students: viewStudent,
  });
};
//==================================================================> view student end
//==================================================================>  edit student
const editStudent = (req, res) => {
  const students = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../db/student.json'))
  );
  const editData = students.find((data) => data.id == req.params.id);
  res.render('student/edit', {
    students: editData,
  });
};
//==================================================================>  edit student end
//====================================================================> update student
const updateStudent = (req, res) => {
  const students = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../db/student.json'))
  );
  const index = students.findIndex(
    (data) => (data.id = req.params.id)
  );
  console.log(index);
  students[index] = {
    ...students[index],
    photo: req.file.filename,
    name: req.body.name,
    email: req.body.email,
    cell: req.body.cell,
    location: req.body.location,
  };
  fs.writeFileSync(
    path.join(__dirname, '../db/student.json'),
    JSON.stringify(students)
  );
  res.redirect('/');
};
//====================================================================> update student end
//========================================================================> delete student
const deleteStudent = (req, res) => {
  const students = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../db/student.json'))
  );
  const afterDeletStudent = students.filter(
    (data) => data.id != req.params.id
  );
  console.log(afterDeletStudent);

  fs.writeFileSync(
    path.join(__dirname, '../db/student.json'),
    JSON.stringify(afterDeletStudent)
  );
  res.redirect('/');
};
//========================================================================> delete student end
//==========================================================================> cell page
const cellpage = (req, res) => {
  res.render('student/cell');
};
//==========================================================================> cell page end
//===========================================================================> cell verification
const cellverification = (req, res) => {
  const { otp } = req.body;
  const students = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../db/student.json'))
  );
  console.log(otp);
  students[students.findIndex((data) => data.otp == otp)] = {
    ...students[students.findIndex((data) => data.otp == otp)],
    Isverified: true,
  };
  fs.writeFileSync(
    path.join(__dirname, '../db/student.json'),
    JSON.stringify(students)
  );
  res.redirect('/');
};
//===========================================================================> cell verification end
//===========================================================================> email verification
const emailverification = (req, res) => {
  const students = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../db/student.json'))
  );
  const token = req.params.token;

  students[students.findIndex((data) => data.token == token)] = {
    ...students[students.findIndex((data) => data.token == token)],
    Isverified: true,
  };

  fs.writeFileSync(
    path.join(__dirname, '../db/student.json'),
    JSON.stringify(students)
  );
  res.redirect('/');
};
//===========================================================================> email verification end
//===========================================================================> export
module.exports = {
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
};

//===========================================================================> export end
