'use client';

import { configureStore } from '@reduxjs/toolkit';
import { todoSlice } from './reducer';

export const store = configureStore({
  reducer:{
    todos: todoSlice,
  },
});