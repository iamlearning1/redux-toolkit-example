import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface TodoState {
    todos: string[];
    loading: boolean;
}

const initialState: TodoState = {
    todos: [],
    loading: false,
}

export const add = createAsyncThunk('todos/add', async (todo: string, thunkAPI) => {
    return new Promise<string>((resolve) => setTimeout(() => resolve(todo), 2000))
})

export const remove = createAsyncThunk('todos/remove', async (idx: number, thunkAPI) => {
    return new Promise<number>((resolve) => setTimeout(() => resolve(idx), 2000))
})

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // add: (state, action: PayloadAction<string>) => {
        //     state.todos.push(action.payload);
        // },
        // remove: (state, action: PayloadAction<number>) => {
        //     state.todos.splice(action.payload, 1);
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(add.pending, (state) => {
                state.loading = true;
            })
            .addCase(add.fulfilled, (state, action) => {
                state.loading = false;
                state.todos.push(action.payload);
            })
            .addCase(remove.pending, (state) => {
                state.loading = true;
            })
            .addCase(remove.fulfilled, (state, action) => {
                state.loading = false;
                state.todos.splice(action.payload, 1);
            })
    }
})

export default todoSlice.reducer;