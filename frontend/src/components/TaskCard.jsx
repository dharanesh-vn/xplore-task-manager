const TaskCard = ({ task, isAdmin, onStatusChange }) => {
    
    const getStatusColor = (status) => {
        switch(status) {
            case 'Pending': return 'status-pending';
            case 'In Progress': return 'status-progress';
            case 'Completed': return 'status-completed';
            default: return 'status-pending';
        }
    };

    return (
        <div className="task-card">
            <div className="task-header">
                <h3 className="task-title">{task.title}</h3>
                <span className={`status-badge ${getStatusColor(task.status)}`}>
                    {task.status}
                </span>
            </div>
            
            <p className="task-desc">{task.description}</p>
            
            <div className="task-meta">
                {isAdmin && task.assignedTo && (
                    <div className="assignee">
                        <strong>Assignee:</strong> {task.assignedTo.name}
                    </div>
                )}
                <div className="date">
                    <strong>Created:</strong> {new Date(task.createdAt).toLocaleDateString()}
                </div>
            </div>
            
            {!isAdmin && onStatusChange && (
                <div className="task-actions">
                    <select 
                        value={task.status} 
                        onChange={(e) => onStatusChange(task._id, e.target.value)}
                        className="status-select"
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            )}
        </div>
    );
};

export default TaskCard;
