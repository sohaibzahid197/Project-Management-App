const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/teams', require('./routes/teams'));
app.use('/api/teamrosters', require('./routes/teamRosters'));
app.use('/api/userstories', require('./routes/userStories'));
app.use('/api/tasks', require('./routes/tasks'));

// Include the teamMembers route
app.use('/api/teamMembers', require('./routes/teamMembers')); 
app.use('/api/assignments', require('./routes/assignments'));


// Configure CORS for your client application
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

const DB_URL = "mongodb+srv://tanojinnamuri1999:Tanoj%231431@cluster0.8fzstuz.mongodb.net/lab";  // For Connection With MongoDB
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
  res.send('Hello, this is the root of your application.');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

