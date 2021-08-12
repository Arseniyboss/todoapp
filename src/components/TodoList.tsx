import { FC } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useTodoContext } from "../contexts/TodoContext";
import { Todo } from "../types/todo";

const TodoList: FC = () => {
  const { todos, filteredTodos } = useTodoContext();

  return (
    <>
      <TodoForm />
      {filteredTodos.map((todo: Todo) => {
        return <TodoItem title={todo.title} key={todo.id} id={todo.id} />;
      })}
      {todos.length > 0 && filteredTodos.length === 0 && (
        <p className="not-found">No todos matched your search criteria</p>
      )}
    </>
  );
};

export default TodoList;
