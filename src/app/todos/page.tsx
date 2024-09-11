import AddTodos from "@/components/todos/addTodos";
import ListTodos from "@/components/todos/listTodos";

export default function TodoApp() {
  return (
    <div className="mx-auto mt-10 p-6 w-3/6">
      <h1 className="text-2xl font-bold mb-4">
        Todo App
      </h1>
      <ListTodos/>
      <div className="bottom-0 left-0 right-0 flex justify-center fixed mb-2">
        <AddTodos/>
      </div>
    </div>
  );
}
