// mock-api.js
import express, { json } from 'express';
const app = express();
const PORT = 3000;

import cors from 'cors';

app.use(cors()); // allow all origins
app.use(json());

// Mock user data


const users = [
  {
    id: 'CSK',
    password: '1234',
    name: 'Chennai Super Kings'
  },
  {
    id: 'MI',
    password: '1234',
    name: 'Mumbai Indians'
  },
  {
    id: 'RCB',
    password: '1234',
    name: 'Royal Challengers Bangalore'
  },
  {
    id: 'KKR',
    password: '1234',
    name: 'Kolkata Knight Riders'
  },
  {
    id: 'GT',
    password: '1234',
    name: 'Gujarat Titans'
  },
  {
    id: 'RR',
    password: '1234',
    name: 'Rajasthan Royals'
  },
  {
    id: 'SRH',
    password: '1234',
    name: 'Sunrisers Hyderabad'
  },
  {
    id: 'DC',
    password: '1234',
    name: 'Delhi Capitals'
  },
  {
    id: 'LSG',
    password: '1234',
    name: 'Lucknow Super Giants'
  },
  {
    id: 'PBKS',
    password: '1234',
    name: 'Punjab Kings'
  }
];


// POST /nam endpoint

app.post('/nam', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.id === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  fetch('http://localhost:8080/teams')
    .then(response => response.json())
    .then(data => {
      const fullUser = data.find(team => team.id === user.id);
      console.log(fullUser)
      if (!fullUser) {
        return res.status(404).json({ error: 'User team data not found' });
      }

      res.json(fullUser); // ✅ only send the relevant user/team object
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to fetch team data' });
    });
});

app.listen(PORT, () => {
  console.log(`Mock API running on http://localhost:${PORT}`);
});
