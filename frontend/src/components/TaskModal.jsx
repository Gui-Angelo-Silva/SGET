import { useState } from 'react';
import axios from 'axios';

const TaskModal = ({ onClose, onUpdateTable }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const baseUrl = "https://localhost:7258/api/OTask";

  const handleCreateTask = async () => {
    try {
      const newTask = {
        name: taskName,
        description: taskDescription,
        state: 1, 
      };

      await axios.post(baseUrl, newTask);
      onUpdateTable();
      onClose(); 
    } catch (error) {
      console.error('Erro ao criar a tarefa:', error);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75'>
      <div className='bg-white p-8 rounded shadow-lg'>
        <h2 className='text-lg font-bold mb-4'>Nova Tarefa</h2>
        <input
          type='text'
          className='border border-gray-400 px-3 py-2 mb-4 w-full'
          placeholder='Nome da Tarefa'
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <textarea
          className='border border-gray-400 px-3 py-2 mb-4 w-full'
          placeholder='Descrição da Tarefa'
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <div className='flex justify-end'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
            onClick={handleCreateTask}
          >
            Criar Tarefa
          </button>
          <button
            className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;