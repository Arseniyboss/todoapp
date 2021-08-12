import { TodosContextState } from "./types";

export const contextDefaultValues: TodosContextState = {
  todos: [],
  filteredTodos: [],
  search: "",
  setSearch: () => () => {},
  addTodo: () => {},
  deleteTodo: () => {},
  clearTodos: () => {},
  editTodo: () => {},
};
