const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Store plain text password (not recommended for production)
const users = [
  { id: 1, email: 'test@test.com', password: 'password' } // plain text password
];

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  // Check if password matches
  if (user.password !== password) {
    return res.status(400).json({ success: false, message: 'Invalid credentials' });
  }

  // Return success response
  res.json({ success: true, message: 'Login successful' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
