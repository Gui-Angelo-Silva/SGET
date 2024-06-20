import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';

const TaskTable = ({ baseUrl, filter }) => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(baseUrl);
            setTasks(response.data);
        } catch (error) {
            console.error('Erro ao buscar as tarefas:', error);
        }
    };

    const handleStart = async (id) => {
        try {
            await axios.put(`${baseUrl}/${id}/start`);
            fetchTasks();
        } catch (error) {
            console.error('Erro ao iniciar a tarefa:', error);
        }
    };

    const handleComplete = async (id) => {
        try {
            await axios.put(`${baseUrl}/${id}/complete`);
            fetchTasks();
        } catch (error) {
            console.error('Erro ao completar a tarefa:', error);
        }
    };

    const handleCancel = async (id) => {
        try {
            await axios.put(`${baseUrl}/${id}/cancel`);
            fetchTasks();
        } catch (error) {
            console.error('Erro ao cancelar a tarefa:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [baseUrl]);

    // Função para filtrar as tarefas com base no filtro selecionado
    const filteredTasks = () => {
        switch (filter) {
            case 'created':
                return tasks.filter(task => task.state === 1);
            case 'inprogress':
                return tasks.filter(task => task.state === 2);
            case 'completed':
                return tasks.filter(task => task.state === 3);
            case 'canceled':
                return tasks.filter(task => task.state === 4);
            case 'all':
            default:
                return tasks;
        }
    };

    return (
        <div className='flex'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {filteredTasks().map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onStart={handleStart}
                        onComplete={handleComplete}
                        onCancel={handleCancel}
                    />
                ))}
                {filteredTasks().length === 0 && (
                    <p className='text-center mt-4'>Nenhuma tarefa encontrada com o filtro selecionado.</p>
                )}
            </div>
        </div>
    );
};

export default TaskTable;
