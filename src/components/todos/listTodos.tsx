"use client";

import { Check, Edit2, Trash2, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTask, removeTask, toggleTask } from "@/redux/reducer";
import { Badge } from "../ui/badge";
import SelectCategory from "./select";

type Ttask = {
  id: string;
  text: string;
  category: string;
  completed: boolean;
};

export default function ListTodos() {
  const [editingTaskId, setEditingTaskId] = useState<Ttask["id"] | null>(null);
  const [editing, setEditing] = useState({
    text: "",
    editingCategory: "",
  });
  const [category, setCategory] = useState("all");
  const [tasks, setTasks] = useState<Ttask[]>([]);

  const dispatch = useDispatch();
  const toggle = (id: Ttask["id"]) => dispatch(toggleTask(id));
  const remove = (id: Ttask["id"]) => dispatch(removeTask(id));

  const edit = (id: Ttask["id"], text: Ttask["text"], editingCategory: Ttask["category"]) => {
    setEditingTaskId(id);
    setEditing({text, editingCategory});
  };

  const getTask = useSelector(
    (state: { todos: { tasks: Ttask[] } }) => state.todos.tasks
  );

  useEffect(() => {
    if (category === "all") {
      setTasks(getTask);
      return;
    }
    const filteredTasks = getTask.filter((task) => task.category === category);
    setTasks(filteredTasks);
  }, [category, getTask]);

  function saveTask() {
    if (editing.text.trim() === "") {
      return;
    }
    dispatch(editTask({ id: editingTaskId, text: editing.text, category: editing.editingCategory }));

    setEditingTaskId(null);
    setEditing({
      text: "",
      editingCategory: "",
    });
  }

  function cancelEdit() {
    setEditingTaskId(null);
    setEditing({
      text: "",
      editingCategory: "",
    });
  }

  return (
    <>
      <div className="text-black mb-2">
        <SelectCategory category={category} setCategory={setCategory} defaultValue="all" />
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center text-black justify-between p-2 bg-gray-100 rounded"
          >
            {editingTaskId === task.id ? (
              <>
                <div className="flex items-center">
                  <Input
                    type="text"
                    value={editing.text}
                    onChange={(e) => setEditing({ ...editing, text: e.target.value })}
                    className="mr-2"
                  />
                </div>
                <div>
                  <SelectCategory
                    category={editing.editingCategory}
                    setCategory={(editingCategory : string) =>
                      setEditing({ ...editing, editingCategory })
                    }
                    defaultValue={editing.editingCategory}
                  />
                </div>
                
                <div>
                  <Button onClick={saveTask} className="m-1">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button onClick={cancelEdit} className="m-1">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => toggle(task.id)}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`task-${task.id}`}
                    className={`${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.text}
                  </label>
                  <Badge variant="default" className="ml-2">
                    {task.category}
                  </Badge>
                </div>
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => edit(task.id, task.text, task.category)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(task.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
