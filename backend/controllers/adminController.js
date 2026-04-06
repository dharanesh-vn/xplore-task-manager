const User = require('../models/User');
const Task = require('../models/Task');

const getEmployees = async (req, res) => {
    try {
        const employees = await User.find({ role: 'employee' }).select('-password');
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const toggleApproval = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.isApproved = !user.isApproved;
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                isApproved: updatedUser.isApproved
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const assignTask = async (req, res) => {
    const { title, description, assignedTo } = req.body;
    try {
        const task = new Task({ title, description, assignedTo });
        const createdTask = await task.save();
        res.status(201).json(createdTask);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}).populate('assignedTo', 'name email');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getEmployees, toggleApproval, assignTask, getAllTasks };
