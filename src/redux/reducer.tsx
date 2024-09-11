'use client'
import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorageItem } from "./localStorage";

type Ttask = {
  id: string;
  text: string;
  category: string;
  completed: boolean;
};

const initialTodoTask: { tasks: Ttask[] } = {
  tasks: getLocalStorageItem("todos") || [],
};

const todoReducer = createSlice({
  name: "todos",
  initialState: initialTodoTask,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTask: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });
    },
    editTask: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            text: action.payload.text,
            category: action.payload.category,
          };
        }
        return task;
      });
    },
  },
});

export const { addTask, removeTask, toggleTask, editTask } = todoReducer.actions;
export const todoSlice = todoReducer.reducer;
