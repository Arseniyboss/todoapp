import { ChangeEvent } from "react";

export type TodosContextState = {
  todos: [];
  filteredTodos: [];
  search: string;
  setSearch: (search: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  clearTodos: () => void;
  editTodo: (title: string, id: number) => void;
};
