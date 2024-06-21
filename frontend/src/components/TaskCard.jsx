import React from 'react';
import TaskStateLabel from './TaskStateLabel';
import { CheckCircle, FlagCheckered, SpinnerGap, XCircle } from '@phosphor-icons/react';

const TaskCard = ({ task, onStart, onComplete, onCancel }) => {
    return (
        <div className='relative max-w-xs h-[400px] bg-white shadow-md rounded-md mb-4 hover:scale-105 hover:transition-transform'>
            <div className='flex w-full h-1.5 bg-blue-500'></div>
            <div className='flex w-full  mt-4 justify-center'>
                {task.state === 1 && (
                    <SpinnerGap size={180}  />
                )}
                {task.state === 2 && (
                    <FlagCheckered size={180} className='text-blue-600' />
                )}
                {task.state === 3 && (
                    <CheckCircle size={180} className='text-green-600' />
                )}
                {task.state === 4 && (
                    <XCircle size={180} className='text-red-600' />
                )}
            </div>
            <div className='px-8'>
                <div className='my-2 flex w-full justify-center'>
                    <span className='text-gray-600 text-xl font-semibold'>{task.name === "" ? "Sem nome!" : task.name}</span>
                </div>
                <div className='my-2 flex w-full justify-center text-center'>
                    <span className='text-gray-400 font-semibold'>{task.description === "" ? "Sem descrição!" : task.description}</span>
                </div>
                <div className='flex items-center justify-center'>
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
            <div className='absolute bottom-0 right-0 p-4'>
                <div className={`flex items-center justify-center rounded-md ${task.state === 2 ? 'w-28' : 'w-24'} h-8 w-24 ${task.state === 3 ? 'bg-green-200' : task.state === 4 ? 'bg-red-200' : task.state === 2 ? 'bg-blue-200' : 'bg-gray-200'}`}>
                    <span className={`font-bold ${task.state === 3 ? 'text-green-600' : task.state === 4 ? 'text-red-600' : task.state === 2 ? 'text-blue-600' : 'text-gray-700'}`}>
                        <TaskStateLabel stateNumber={task.state} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;