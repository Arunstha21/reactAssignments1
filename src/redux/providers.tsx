'use client';
import { Provider } from "react-redux";
import { store } from "./store";
import { setLocalStorageItem } from "./localStorage";

store.subscribe(() => {
    setLocalStorageItem("todos", store.getState().todos.tasks);
}
);

export function Providers({ children } : { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}