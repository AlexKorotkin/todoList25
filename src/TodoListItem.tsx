import {FilterValues, Task} from "./App.tsx";
import {Button} from "./assets/Button.tsx";

type TodolistPropsType = {
    title: string,
    tasks: Task[],
    deleteTask: (id: number) => void,
    changeFilter: (filter: FilterValues) => void
}

export const TodoListItem = ({title, tasks, deleteTask, changeFilter}: TodolistPropsType) => {


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={()=> deleteTask(task.id)}/>
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

