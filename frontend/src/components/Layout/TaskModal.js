import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './TaskModal.module.css';

const TaskModal = ({ show, onClose, onSave, task }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title ?? '');
            setDescription(task.description ?? '');
        } else {
            setTitle('');
            setDescription('');
        }
    }, [task]);

    const handleSave = () => {
        if (!title.trim()) {
            setError('O título não pode estar vazio.');
            return;
        }
        setError('');
        const updatedTask = { ...task, title, description };
        onSave(updatedTask);
    };

    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h5 className="modal-title">{task ? 'Editar Tarefa' : 'Adicionar Tarefa'}</h5>
                    <button type="button" className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className={styles.modalBody}>
                    <div className="form-group">
                        <label htmlFor="taskTitle">Título</label>
                        <input
                            type="text"
                            id="taskTitle"
                            maxLength="255"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {error && <div className={styles.error}>{error}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskDescription">Descrição</label>
                        <textarea
                            id="taskDescription"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                    <button 
                        type="button" 
                        className="btn btn-primary" 
                        onClick={handleSave}
                        disabled={!title.trim()}
                    >
                        {task ? 'Salvar Alterações' : 'Adicionar Tarefa'}
                    </button>
                </div>
            </div>
        </div>
    );
};

TaskModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    task: PropTypes.object,
};

export default TaskModal;
