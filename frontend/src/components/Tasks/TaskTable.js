import styles from './TaskTable.module.css';

const TaskTable = ({ tasks, onAdd, onEdit, onComplete, onDelete }) => {
    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Lista de Tarefas</h2>
                <button className="btn btn-primary" onClick={onAdd}>Adicionar Tarefa</button>
            </div>

            <div className={styles.tableWrapper}>
                <table className={`table table-hover ${styles.customTable}`}>
                    <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks && tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <tr key={`${task.id}-${index}`} onClick={() => onEdit(task.id)} className={task.completed ? styles.completedRow : ''}>
                                <td className={task.completed ? styles.completedText : ''}>{task.title}</td>
                                <td className={`${styles.descriptionColumn} ${task.completed ? styles.completedText : ''}`} title={task.description}>
                                    {task.description}
                                </td>
                                <td className={styles.tdButton}>
                                    <button className={`btn ${task.completed ? 'btn-warning' : 'btn-success'} me-2`} onClick={(event) => {event.stopPropagation();onComplete(task.id);}}>
                                        {task.completed ? 'Retomar' : 'Concluir'}
                                    </button>
                                    <button className="btn btn-danger" onClick={(event) => {event.stopPropagation();onDelete(task.id);}}>
                                        Remover
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">
                                Você ainda não possui tarefas, adicione para poder gerenciá-las.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TaskTable;
