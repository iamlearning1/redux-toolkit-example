import { useState, useRef } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
    add,
    remove
} from './todoSlice';

import styles from './Todo.module.css';

const Todo = () => {
    const todos = useAppSelector(state => state.todos.todos);
    const loading = useAppSelector(state => state.todos.loading);
    const dispatch = useAppDispatch();

    const [text, setText] = useState('');

    const ref = useRef<any>();

    const addTodo = (event: any) => {
        if (event.key === 'Enter' || event.type === 'click') {
            setText('');
            dispatch(add(text));
            ref?.current?.focus();
        }
    }

    return (
        <div className={styles.todo}>
            <input 
                type="text" 
                placeholder="Enter your todo" 
                value={text} 
                onChange={(event) => setText(event.target.value)} 
                className={styles.textbox}
                ref={ref}
                onKeyPress={addTodo}
            />
            <button 
                className={styles.button} 
                onClick={addTodo}
            >
                Add todo
            </button>
            {loading ? <span>Loading...</span> : todos.map((todo: string, idx: number) => <div key={idx}>
                <span className={styles.textbox}>{todo}</span>
                <button 
                    className={styles.button} 
                    onClick={() => dispatch(remove(idx))}
                >
                Delete
            </button>
            </div>)}
        </div>
    )
}

export default Todo;