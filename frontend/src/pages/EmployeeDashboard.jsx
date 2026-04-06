import { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';

const EmployeeDashboard = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/tasks/mine');
            setTasks(res.data);
            setError(null);
        } catch (err) {
            if (err.response?.status === 403) {
                setError('Your account is pending admin approval.');
            } else {
                setError('Failed to fetch tasks.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await api.patch(`/api/tasks/${taskId}/status`, { status: newStatus });
            setTasks(tasks.map(task => 
                task._id === taskId ? { ...task, status: newStatus } : task
            ));
        } catch (err) {
            console.error('Failed to update task status', err);
        }
    };

    if (loading) return <div className="loader-container"><div className="loader"></div></div>;

    if (error) {
        return (
            <div className="dashboard-container">
                <div className="pending-approval-card">
                    <h2>Wait a minute!</h2>
                    <p>{error}</p>
                    <p className="text-muted">Please contact your administrator to get approved.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1>My Tasks</h1>
                    <p className="text-muted">Manage your assigned duties and progress</p>
                </div>
            </header>

            <main className="dashboard-content">
                <div className="tasks-grid">
                    {tasks.map(task => (
                        <TaskCard 
                            key={task._id} 
                            task={task} 
                            isAdmin={false} 
                            onStatusChange={handleStatusChange} 
                        />
                    ))}
                    {tasks.length === 0 && (
                        <div className="empty-state">
                            <p>You have no tasks assigned right now.</p>
                            <p className="text-muted">Enjoy your day!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EmployeeDashboard;
