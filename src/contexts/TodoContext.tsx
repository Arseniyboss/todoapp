import { useState, useEffect, useContext, createContext, FC } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { v1 } from "uuid";
import { Todo } from "../types/todo";
import { TodosContextState } from "../types/contexts/todo/types";
import { contextDefaultValues } from "../types/contexts/todo/values";

export const TodoContext =
  createContext<TodosContextState>(contextDefaultValues);

const TodoContextProvider: FC = ({ children }) => {
  const [todos, setTodos] = useLocalStorage(
    "todos",
    contextDefaultValues.todos
  );
  const [filteredTodos, setFilteredTodos] = useState(
    contextDefaultValues.filteredTodos
  );
  const [search, setSearch] = useLocalStorage(
    "name",
    contextDefaultValues.search
  );

  useEffect(() => {
    const filteredTodos = todos.filter((todo: Todo) => {
      return todo.title.toLowerCase().startsWith(search.toLowerCase().trim());
    });
    setFilteredTodos(filteredTodos);
  }, [todos, search, setFilteredTodos]);

  const addTodo = (title: string) => setTodos([...todos, { title, id: v1() }]);

  const deleteTodo = (id: number) =>
    setTodos(todos.filter((todo: Todo) => todo.id !== id));

  const clearTodos = () => {
    setTodos([]);
  };

  const editTodo = (title: string, id: number) => {
    const editedTodo = todos.map((todo: Todo) =>
      todo.id === id ? { title, id } : todo
    );
    setTodos(editedTodo);
  };

  const value = {
    todos,
    filteredTodos,
    setFilteredTodos,
    search,
    setSearch,
    addTodo,
    deleteTodo,
    clearTodos,
    editTodo,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  return useContext(TodoContext);
};

export default TodoContextProvider;
