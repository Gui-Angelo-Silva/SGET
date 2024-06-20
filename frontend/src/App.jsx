import React, { useState } from 'react';
import TaskTable from './components/Table';
import TaskModal from './components/TaskModal';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [tableKey, setTableKey] = useState(0);
  const [filter, setFilter] = useState('all'); 

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const updateTable = () => {
    setTableKey(prevKey => prevKey + 1);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className='min-h-screen w-full'>
      <div className='flex justify-center'>
        <h1 className='text-3xl py-10'>Sistema de Gerenciamento de Estados de Tarefas</h1>
      </div>

      <div className='flex justify-center mb-4'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          onClick={openModal}
        >
          Nova Tarefa
        </button>
      </div>

      <div className='flex justify-center mb-4'>
        <label htmlFor="filterSelect" className="mr-2">Filtrar por estado:</label>
        <select id="filterSelect" value={filter} onChange={handleFilterChange} className="p-2">
          <option value="all">Todas</option>
          <option value="created">Criadas</option>
          <option value="inprogress">Em Progresso</option>
          <option value="completed">Concluídas</option>
          <option value="canceled">Canceladas</option>
        </select>
      </div>

      <div className='flex justify-center'>
        <TaskTable key={tableKey} baseUrl={"https://localhost:7258/api/OTask"} filter={filter} />
      </div>

      {showModal && (
        <TaskModal onClose={closeModal} onUpdateTable={updateTable} />
      )}
    </div>
  );
}

export default App;
