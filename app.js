const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/user_login', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware
app.use(express.urlencoded({ extended: true }));

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the User Login System</h1><a href="/register">Register</a><br><a href="/login">Login</a>');
});

// Registration Route
app.get('/register', (req, res) => {
    res.send(`
        <form action="/register" method="POST">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Register</button>
        </form>
    `);
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.send('User registered! <a href="/login">Login</a>');
});
//abc //pwd-123
// Login Route
app.get('/login', (req, res) => {
    res.send(`
        <form action="/login" method="POST">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
    `);
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if ((password== user.password)) {
        res.send('Logged in! <a href="/profile">Go to Profile</a>');
    } else {
        res.send('Invalid credentials! <a href="/login">Try again</a>');
    }

});

// Profile Route
app.get('/profile', (req, res) => {
   
    res.send('Welcome to your profile!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

