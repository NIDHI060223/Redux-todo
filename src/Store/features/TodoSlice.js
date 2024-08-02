import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    todos:[]
}

const TodoSlice = createSlice ({
    name: 'todo',
    initialState,
    reducers:{
        addTodo : (state, action) =>{
            state.todos.push(action.payload);
        },
        updateTodo : (state, action) => {
            const {id, newText} = action.payload;
            const todoToUpdate = state.todos.find(todo => todo.id === id);
            if(todoToUpdate){
                todoToUpdate.text = newText;
            }
        },
        deleteTodo : (state, action) =>{
            state.todos = state.todos.filter((todo)=>todo.id !== action.payload);
        },
        clearTodo : (state, action) =>{
            state.todos = [];
        }
    }
})
console.log('Actions :', TodoSlice);

export const {addTodo, updateTodo, deleteTodo, clearTodo} = TodoSlice.actions;
export default TodoSlice.reducer;