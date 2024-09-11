"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { addTask } from "@/redux/reducer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import SelectCategory from "./select";

export default function AddTodos() {
  const [newTask, setNewTask] = useState("");
  const [type, setType] = useState("personal");

  const dispatch = useDispatch();

  function addTasks() {
    if (newTask.trim() === "") {
      return;
    }
    dispatch(
      addTask({
        id: Math.random().toFixed().toString(),
        text: newTask,
        completed: false,
        category: type,
      })
    );
    setNewTask("");
  }

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="bg-black text-white font-bold">
            Add Todos
          </Button>
        </SheetTrigger>
        <SheetContent side={"bottom"} className="rounded-xl">
          <SheetHeader>
            <SheetTitle>Add new TODO</SheetTitle>
            <SheetDescription>
              You can add a new task to your list and select category.
            </SheetDescription>
          </SheetHeader>
          <div className="flex mb-4">
            <Input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
              className="mr-2 text-black mt-2"
              onKeyDown={(e) => e.key === "Enter" && addTasks()}
            />
          </div>
          <div className="flex item-center justify-between text-black">
            <div>
              <SelectCategory category={type} setCategory={setType} defaultValue="personal" />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button onClick={addTasks}>Add</Button>
              </SheetClose>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
