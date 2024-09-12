import {createTask, deleteTask, getTasks, updateTask} from "../../services/api";
import {useEffect, useState} from "react";
import TaskTable from "./TaskTable";
import TaskModal from "../Layout/TaskModal";
import ErrorPage from "../Error/pageError";

const TasksComponent =  () => {
    const [tasks, setTasks] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
 
    useEffect(() =>{
        let isMounted = true;

            const fetchTask = async ()=>{
                try{
                const data = await getTasks();
                if(isMounted){
                    const result = data.data;
                    setTasks(result)
                }
               
            }
            catch(error){
                if (isMounted){
                    setError("Falha ao carregar as tarefas. Por favor, tente novamente.");
                    console.error("Erro ao buscar as tarefas:", error);
                 }
            }
            finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }
        fetchTask()
        return()=>{
            isMounted = false
        }
    }, [])

    const handleAddTask = () =>{
        setSelectedTask(null)
        setShowModal(true)
    }

    const handleEditTask = (taskId)=>{
        const taskToEdit = tasks.find((task)=>task.id === taskId)
        setSelectedTask(taskToEdit)
        setShowModal(true)
    }

    const handleSaveTask = async (task) =>{
        try{
            if(task.id){
                const updatedTask = await updateTask(task.id, task);
                setTasks(tasks.map((t)=>(t.id===task.id ? updatedTask.data : t)))
                setShowModal(false);
            }else{
                const newTask = await createTask(task);
                setTasks([...tasks, newTask.data])
                setShowModal(false);
            }
        }catch(error){
            setError("Falha ao salvar a tarefa. Por favor, tente novamente.");
            console.error("Erro ao salvar a tarefa:", error);
        }
    }

    useEffect(() => {
        const inProgressTasks = tasks.filter(task => task.completed === 0).length;
        document.title = `Você possui ${inProgressTasks} tarefas em andamento`;
    }, [tasks]);


    const handleDeleteTask = async (taskId)=>{
        try{
            await deleteTask(taskId);
            setTasks(tasks.filter((task)=> task.id !== taskId))
        }catch(error){
            setError("Falha ao excluir a tarefa. Por favor, tente novamente.");
            console.error("Erro ao excluir a tarefa:", error);
        }
    }

    const handleCompleteTask = async (taskId) => {
        try {
            const taskToComplete = tasks.find((task) => task.id === taskId);
            const updatedTask = await updateTask(taskId, {
                ...taskToComplete,
                completed: taskToComplete.completed === 0 ? 1 : 0,
            });
            setTasks(tasks.map((task) => (task.id === taskId ? updatedTask.data : task)));
        } catch (error) {
            setError("Falha ao concluir a tarefa. Por favor, tente novamente.");
            console.error("Erro ao concluir a tarefa:", error);
        }
    };
    

    if(error){
        return <ErrorPage message={error}/>;
    }
    if(loading) {
        return (
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }

    return (
        <>
            <TaskTable
                tasks={tasks}
                onAdd={handleAddTask}
                onEdit={handleEditTask}
                onComplete={handleCompleteTask}
                onDelete={handleDeleteTask}
            />
            <TaskModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleSaveTask}
                task={selectedTask}
            />
        </>
    );
};
export default TasksComponent


