import { Button, FormControl, TextField } from "@mui/material";
import React, { ChangeEvent, FormEvent, useState } from "react";


interface TODO {
    text: string
    id?: number
}

interface TODOList {
    text: string
    id?: number
}

export const Todo: React.FC = () => {
    const [todoTasks, setTodoTasks] = useState<TODOList[]>([])
    const [todoTask, setTodoTask] = useState<TODO>({
        text: ""
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setTodoTask({ ...todoTask, [name]: value })
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            if (!todoTask.id) {
                const totalTasks = todoTasks.length
                const lastTakId = todoTasks[totalTasks - 1]?.id || 0
                const payload = {
                    text: todoTask.text,
                    id: (totalTasks) ? lastTakId + 1 : 1
                }
                setTodoTasks([...todoTasks, payload])
            }
            else {

            }

            setTodoTask({ text: "" })
        } catch (error) {
            console.log(error)
        }
    }

    const deleteItem = (id?: number) => {
        const filter = todoTasks.filter(item => item.id !== id)
        setTodoTasks(filter)
    }


    return (
        <>
            <div className="event-container">
                <h1>Todo List</h1>

                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <TextField
                            label="Event Name"
                            type="text"
                            name="text"
                            value={todoTask.text}
                            variant="standard"
                            onChange={handleChange}
                        />
                    </FormControl>
                    <Button variant="contained" type="submit">Add TODO</Button>
                </form>

                <h4>Todo List Data</h4>
                <ul>
                    {
                        todoTasks.map((item, index) => (
                            <li key={index}>
                                <p>
                                    <span>{item.id?.toString()}</span>
                                    <span>{item.text}</span>
                                    <button onClick={() => deleteItem(item.id)}>Delete</button>
                                </p>
                            </li>
                        ))
                    }
                </ul>

            </div>
        </>
    )
}
