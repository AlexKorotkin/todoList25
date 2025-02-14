import {FilterValues, Task} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodolistPropsType = {
    title: string,
    tasks: Task[],
    deleteTask: (id: string) => void,
    changeFilter: (filter: FilterValues) => void,
    createTask: (title: string) => void,
}

export const TodoListItem = ({title, tasks, deleteTask, changeFilter, createTask}: TodolistPropsType) => {

    const [taskTitle, setTaskTitle] = useState<string>('');

    const createTaskHandler = () => {
        createTask(taskTitle);
        setTaskTitle('');
    };
    const changeTaskTitleHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setTaskTitle(e.currentTarget.value)};

    const createTaskOnEnterHandler = (e:KeyboardEvent<HTMLInputElement>) =>{
        if (e.key === 'Enter') {
            createTaskHandler()
        }
    };


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={changeTaskTitleHandler}
                        onKeyDown={createTaskOnEnterHandler}
                />
                <Button title={"+"} onClick={createTaskHandler}/>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => deleteTask(task.id)
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button onClick={()=>changeFilter('all')} title={"All"}/>
                <Button onClick={()=>changeFilter('active')} title={"Active"}/>
                <Button onClick={()=>changeFilter('completed')} title={"Completed"}/>
            </div>
        </div>
    );
};

