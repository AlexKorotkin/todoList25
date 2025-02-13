import './App.css'
import {TodoListItem} from "./TodoListItem.tsx";
import {useState} from "react";



export type FilterValues = 'all' | 'active' | 'completed'

export type Task = {
    id: number,
    title: string,
    isDone: boolean
}

function App() {


    const [tasks, setTasks] = useState<Task[]>([
        {id: 1, title: 'Task 1', isDone: true},
        {id: 2, title: 'Task 2', isDone: false},
        {id: 3, title: 'Task 3', isDone: true},
        {id: 4, title: 'Task 4', isDone: false},
        {id: 5, title: 'Task 5', isDone: false}
    ]);
    const [filter, setFilter] = useState<FilterValues>('all');

    const changeFilter = (filter: FilterValues) => {
        setFilter(filter);
    }

    const deleteTask = (taskId: number) => {
        const filteredTasks: Task[] = tasks.filter((task) => task.id !== taskId);
        return setTasks(filteredTasks)
    };


    let filteredTasks = tasks;
    if (filter === 'completed') {
        filteredTasks = tasks.filter((task: Task) => task.isDone);
    }


    if (filter === 'active') {
        filteredTasks = tasks.filter((task: Task) => !task.isDone);
    }


    return (
        <div className="App">
            <TodoListItem title = {"What to learn"} tasks = {filteredTasks} deleteTask={deleteTask} changeFilter = {changeFilter} />
        </div>
    )
}

export default App
