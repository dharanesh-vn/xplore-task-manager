import { useState, useEffect } from 'react';
import api from '../api/axios';
import TaskCard from '../components/TaskCard';

const AdminDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [activeTab, setActiveTab] = useState('employees');
    
    // Task Assignment Form
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchEmployees();
        fetchTasks();
    }, []);

    const fetchEmployees = async () => {
        try {
            const res = await api.get('/api/admin/employees');
            setEmployees(res.data);
        } catch (err) {
            console.error('Failed to fetch employees', err);
        }
    };

    const fetchTasks = async () => {
        try {
            const res = await api.get('/api/tasks/all');
            setTasks(res.data);
        } catch (err) {
            console.error('Failed to fetch tasks', err);
        }
    };

    const handleApprove = async (id, currentStatus) => {
        try {
            await api.patch(`/api/admin/approve/${id}`, { isApproved: !currentStatus });
            fetchEmployees();
        } catch (err) {
            console.error('Failed to update approval status', err);
        }
    };

    const handleAssignTask = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/admin/tasks', { title, description, assignedTo });
            setMessage('Task assigned successfully!');
            setTitle('');
            setDescription('');
            setAssignedTo('');
            fetchTasks();
        } catch (err) {
            setMessage('Failed to assign task');
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <div className="tabs">
                    <button 
                        className={`tab-btn ${activeTab === 'employees' ? 'active' : ''}`}
                        onClick={() => setActiveTab('employees')}
                    >
                        Employees
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'assign' ? 'active' : ''}`}
                        onClick={() => setActiveTab('assign')}
                    >
                        Assign Task
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tasks')}
                    >
                        All Tasks
                    </button>
                </div>
            </header>

            <main className="dashboard-content">
                {activeTab === 'employees' && (
                    <div className="staff-section">
                        <h2>Employee Management</h2>
                        <div className="table-responsive">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map(emp => (
                                        <tr key={emp._id}>
                                            <td>{emp.name}</td>
                                            <td>{emp.email}</td>
                                            <td>
                                                <span className={`status-badge ${emp.isApproved ? 'status-approved' : 'status-pending'}`}>
                                                    {emp.isApproved ? 'Approved' : 'Pending'}
                                                </span>
                                            </td>
                                            <td>
                                                <button 
                                                    onClick={() => handleApprove(emp._id, emp.isApproved)}
                                                    className={`btn-small ${emp.isApproved ? 'btn-danger' : 'btn-success'}`}
                                                >
                                                    {emp.isApproved ? 'Revoke' : 'Approve'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {employees.length === 0 && (
                                        <tr><td colSpan="4" className="text-center">No employees found</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'assign' && (
                    <div className="task-assign-section">
                        <h2>Assign New Task</h2>
                        <div className="card form-card">
                            {message && <div className="alert">{message}</div>}
                            <form onSubmit={handleAssignTask}>
                                <div className="form-group">
                                    <label>Task Title</label>
                                    <input 
                                        type="text" 
                                        value={title} 
                                        onChange={(e) => setTitle(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea 
                                        value={description} 
                                        onChange={(e) => setDescription(e.target.value)} 
                                        rows="4"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Assign To</label>
                                    <select 
                                        value={assignedTo} 
                                        onChange={(e) => setAssignedTo(e.target.value)} 
                                        required
                                    >
                                        <option value="">Select Employee</option>
                                        {employees.filter(e => e.isApproved).map(emp => (
                                            <option key={emp._id} value={emp._id}>
                                                {emp.name} ({emp.email})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="btn-primary">Assign Task</button>
                            </form>
                        </div>
                    </div>
                )}

                {activeTab === 'tasks' && (
                    <div className="tasks-section">
                        <h2>All Assigned Tasks</h2>
                        <div className="tasks-grid">
                            {tasks.map(task => (
                                <TaskCard key={task._id} task={task} isAdmin={true} />
                            ))}
                            {tasks.length === 0 && <p className="text-muted">No tasks assigned yet.</p>}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
