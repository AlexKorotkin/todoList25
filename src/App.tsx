import './App.css'
import {TodoListItem} from "./TodoListItem.tsx";
import {useState} from "react";
import {v1} from "uuid";



export type FilterValues = 'all' | 'active' | 'completed'

export type Task = {
    id: string,
    title: string,
    isDone: boolean
}

function App() {


    const [tasks, setTasks] = useState<Task[]>([
        {id: v1(), title: 'Task 1', isDone: true},
        {id: v1(), title: 'Task 2', isDone: false},
        {id: v1(), title: 'Task 3', isDone: true},
        {id: v1(), title: 'Task 4', isDone: false},
        {id: v1(), title: 'Task 5', isDone: false}
    ]);
    const [filter, setFilter] = useState<FilterValues>('all');

    const changeFilter = (filter: FilterValues) => {
        setFilter(filter);
    }

    const createTask = (title: string) => {
        return setTasks([{id: v1(), title: title, isDone: false}, ...tasks]);
    }

    const deleteTask = (taskId: string) => {
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
            <TodoListItem title = {"What to learn"}
                          tasks = {filteredTasks}
                          deleteTask={deleteTask}
                          changeFilter = {changeFilter}
                          createTask = {createTask}
            />
        </div>
    )
}

export default App
