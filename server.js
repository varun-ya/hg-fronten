const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve teacher app
app.use('/teacher', express.static(path.join(__dirname, 'hg_teacher', 'eleven-labs-dashboard', 'out')));
app.use('/teacher/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'hg_teacher', 'eleven-labs-dashboard', 'out', 'index.html'));
});

// Serve student app
app.use('/student', express.static(path.join(__dirname, 'hg_teacher', 'student-webapp', 'out')));
app.use('/student/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'hg_teacher', 'student-webapp', 'out', 'index.html'));
});

// Serve homeguru app (root)
app.use(express.static(path.join(__dirname, 'homeguru', 'out')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'homeguru', 'out', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📍 HomeGuru: http://localhost:${PORT}`);
  console.log(`📍 Teacher: http://localhost:${PORT}/teacher`);
  console.log(`📍 Student: http://localhost:${PORT}/student`);
});
