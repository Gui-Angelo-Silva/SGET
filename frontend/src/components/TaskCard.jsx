import React from 'react'
import TaskStateLabel from './TaskStateLabel';

const TaskCard = ({ task, onStart, onComplete, onCancel }) => {
    return (
        <div className='max-w-xs bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
                <span className='text-gray-700 font-bold'>Nome: </span>{task.name}
            </div>
            <div className='mb-4'>
                <span className='text-gray-700 font-bold'>Descrição: </span>{task.description}
            </div>
            <div className='mb-4'>
                <span className='text-gray-700 font-bold'>Estado: </span>
                <TaskStateLabel stateNumber={task.state} />
            </div>
            <div className='flex items-center'>
                {task.state === 1 && (
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2'
                        onClick={() => onStart(task.id)}
                    >
                        Iniciar
                    </button>
                )}
                {task.state === 2 && (
                    <button
                        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2'
                        onClick={() => onComplete(task.id)}
                    >
                        Concluir
                    </button>
                )}
                {(task.state === 1 || task.state === 2) && (
                    <button
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        onClick={() => onCancel(task.id)}
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskCard