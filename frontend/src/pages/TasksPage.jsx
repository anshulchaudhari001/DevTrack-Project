import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import TaskFormModal from '../components/TaskFormModal';
import { Edit2, Trash2, Plus, Calendar, Flag } from 'lucide-react';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddClick = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
      toast.success('Task deleted');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    try {
      const res = await api.put(`/tasks/${task._id}`, { ...task, status: newStatus });
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleSubmit = async (taskData) => {
    try {
      if (editingTask) {
        const res = await api.put(`/tasks/${editingTask._id}`, taskData);
        setTasks(tasks.map((t) => (t._id === editingTask._id ? res.data : t)));
        toast.success('Task updated');
      } else {
        const res = await api.post('/tasks', taskData);
        setTasks([res.data, ...tasks]);
        toast.success('Task created');
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to save task');
    }
  };

  const renderColumn = (status, title) => {
    const columnTasks = tasks.filter((t) => t.status === status);
    
    return (
      <div className="flex flex-col rounded-lg bg-gray-50 dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 h-full min-h-[500px]">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white flex justify-between">
          <span>{title}</span>
          <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm py-1 px-2 rounded-full">{columnTasks.length}</span>
        </h3>
        
        <div className="space-y-3 overflow-y-auto flex-1">
          {columnTasks.map((task) => (
            <div key={task._id} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 group">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900 dark:text-white line-clamp-2">{task.title}</h4>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEditClick(task)} className="text-gray-400 hover:text-blue-500">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(task._id)} className="text-gray-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              {task.description && (
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-3 line-clamp-2">{task.description}</p>
              )}
              
              <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex space-x-3">
                  {task.dueDate && (
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                  <span className={`flex items-center ${
                    task.priority === 'High' ? 'text-red-500' : 
                    task.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500'
                  }`}>
                    <Flag size={14} className="mr-1" />
                    {task.priority}
                  </span>
                </div>
                
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task, e.target.value)}
                  className="text-xs border-none bg-transparent focus:ring-0 cursor-pointer dark:text-gray-300 dark:bg-gray-700"
                >
                  <option value="Todo">Todo</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h1>
        <button
          onClick={handleAddClick}
          className="mt-3 inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
        >
          <Plus size={18} className="mr-2" />
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-hidden">
        {renderColumn('Todo', 'To Do')}
        {renderColumn('InProgress', 'In Progress')}
        {renderColumn('Done', 'Done')}
      </div>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingTask}
      />
    </div>
  );
};

export default TasksPage;
