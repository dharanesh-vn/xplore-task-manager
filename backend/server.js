const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Seed Script to auto-create admin (simple version)
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const createDefaultAdmin = async () => {
    try {
        const adminExists = await User.findOne({ email: 'admin@xplore.com' });
        if (!adminExists) {
            await User.create({
                name: 'System Admin',
                email: 'admin@xplore.com',
                password: 'admin123',
                role: 'admin',
                isApproved: true
            });
            console.log('Default admin created.');
        }
    } catch (error) {
        console.error('Error creating default admin:', error);
    }
};

createDefaultAdmin();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
