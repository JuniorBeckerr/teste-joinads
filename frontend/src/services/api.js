import axios from 'axios';

const API_BASE_URL=process.env.REACT_APP_API_URL;


const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getTasks = async () => {
    const response = await api.get('/');

    return response.data;
};

export const getTaskById = async (id) => {
    const response = await api.get(`/${id}`);
    return response.data;
};

export const createTask = async (taskData) => {
    const response = await api.post('/', taskData);
    return response.data;
};

export const updateTask = async (id, taskData) => {
    const response = await api.put(`/${id}`, taskData);
    return response.data;
};

export const deleteTask = async (id) => {
    await api.delete(`/${id}`);
};
