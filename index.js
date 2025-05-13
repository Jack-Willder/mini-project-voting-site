<<<<<<< HEAD
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/submit', (req, res) => {
  console.log("submiting");
  const { roll, topic } = req.body;
  if (!roll || !topic) {
    return res.status(400).json({error: "Missing fields" });
  }
  const wordCount = topic.trim().split(/\s+/).filter(w => w).length;
  if (wordCount > 50) {
    return res.status(400).json({error: "Topic too long" });
  }
  let submissions = [];
  try {
    if (fs.existsSync('submissions.json')) {
      submissions = JSON.parse(fs.readFileSync('submissions.json', 'utf8'));
    }
  } catch (e) {
    submissions = [];
  }
  submissions.push({ roll, topic });
  fs.writeFileSync('submissions.json', JSON.stringify(submissions, null, 2), 'utf8');
  res.json({ submissions });
});

app.get('/submissions', (req, res) => {
  let submissions = [];
  try {
    if (fs.existsSync('submissions.json')) {
      submissions = JSON.parse(fs.readFileSync('submissions.json', 'utf8'));
    }
  } catch (e) {
    submissions = [];
  }
  res.json({ submissions });
});

=======
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/submit', (req, res) => {
  console.log("submiting");
  const { roll, topic } = req.body;
  if (!roll || !topic) {
    return res.status(400).json({error: "Missing fields" });
  }
  const wordCount = topic.trim().split(/\s+/).filter(w => w).length;
  if (wordCount > 50) {
    return res.status(400).json({error: "Topic too long" });
  }
  let submissions = [];
  try {
    if (fs.existsSync('submissions.json')) {
      submissions = JSON.parse(fs.readFileSync('submissions.json', 'utf8'));
    }
  } catch (e) {
    submissions = [];
  }
  submissions.push({ roll, topic });
  fs.writeFileSync('submissions.json', JSON.stringify(submissions, null, 2), 'utf8');
  res.json({ submissions });
});

app.get('/submissions', (req, res) => {
  let submissions = [];
  try {
    if (fs.existsSync('submissions.json')) {
      submissions = JSON.parse(fs.readFileSync('submissions.json', 'utf8'));
    }
  } catch (e) {
    submissions = [];
  }
  res.json({ submissions });
});

>>>>>>> a16b8c7 (Second Initial commit)
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));