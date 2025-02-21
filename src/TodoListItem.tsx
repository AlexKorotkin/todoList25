import {FilterValues, Task} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodolistPropsType = {
    title: string,
    tasks: Task[],
    deleteTask: (id: string) => void,
    changeFilter: (filter: FilterValues) => void,
    createTask: (title: string) => void,
    changeTaskStatus: (taskId: string, isDone:boolean)=> void
    filter: FilterValues
}

export const TodoListItem = ({title, tasks, deleteTask, changeFilter, createTask, changeTaskStatus, filter}: TodolistPropsType) => {

    const [taskTitle, setTaskTitle] = useState<string>('');
    const [error, setError] = useState<null | string>(null);

    const createTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            setError(null);
            createTask(taskTitle.trim());
            setTaskTitle('');
        }else {
            setError("Введите текст");
        }

    };
    const changeTaskTitleHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setTaskTitle(e.currentTarget.value);
        setError(null);
    };

    const createTaskOnEnterHandler = (e:KeyboardEvent<HTMLInputElement>) =>{
        if (e.key === 'Enter') {
            createTaskHandler()
        }
    };


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input className={error? "error": ""} value={taskTitle}
                       onChange={changeTaskTitleHandler}
                        onKeyDown={createTaskOnEnterHandler}
                />
                <Button title={"+"} onClick={createTaskHandler}/>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => deleteTask(task.id);
                        const changeTaskStatusHandler  = (e:ChangeEvent<HTMLInputElement> ) =>{
                            changeTaskStatus(task.id, e.currentTarget.checked )
                        }
                        return (
                            <li className={task.isDone? "is-done": ""} key={task.id}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler }/>
                                <span>{task.title}</span>
                                <Button  title={'x'} onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button className={filter=== "all"? "active-filter": ""} onClick={()=>changeFilter('all')} title={"All"}/>
                <Button className={filter=== "active"? "active-filter": ""} onClick={()=>changeFilter('active')} title={"Active"}/>
                <Button className={filter=== "completed"? "active-filter": ""} onClick={()=>changeFilter('completed')} title={"Completed"}/>
            </div>
        </div>
    );
};

