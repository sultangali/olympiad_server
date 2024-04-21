const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const PORT = 5000;

app.use(express.json());
app.use(cors()); 

   

const start = async () => {
  try {
    await mongoose.set('strictQuery', true)
    await mongoose.connect('mongodb+srv://sultzx:Ejyv7pWxIReKnGAI@cluster0.mufymz0.mongodb.net/studentsDB')
    console.log(`database OK\tname: ${mongoose.connection.name}`)
  } catch (error) {
    console.log(`database error\tmessage: ${error.message}`)
  }
  
  const StudentSchema = new mongoose.Schema({
    fullname: String,
    shifr: String,
    subject: String,
    course: String,
    language: String,
    phone: String,
    email: String,
    university: String,
    city: String,
    present: Boolean,
  });

  const Student = mongoose.model('Students', StudentSchema)

  app.get('/api/students', async (req, res) => {
    try {
      const students = await Student.find();
      res.json(students);
    } catch (err) {
      res.status(500).send('Ошибка при получении списка студентов');
    }
  });
 
  app.put('/api/students/:id', async (req, res) => {
    const { present } = req.body;
    try {
      const student = await Student.findByIdAndUpdate(req.params.id, { present }, { new: true });
      res.json(student);
    } catch (error) {
      console.error('Ошибка при обновлении статуса студента:', error);
      res.status(500).send('Не удалось обновить статус студента');
    }
  });
 
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} 

start()

