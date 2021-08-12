import { useState, useEffect, useRef, FormEvent, FC } from "react";
import { useTodoContext } from "../contexts/TodoContext";

const TodoForm: FC = () => {
  const [title, setTitle] = useState("");

  const { todos, search, setSearch, addTodo, clearTodos } = useTodoContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, todos]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title) {
      addTodo(title.trim());
      setTitle("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="add-form">
        <h1>Todo List</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search todos"
        />
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add todo"
          maxLength={20}
        />
        <button>Add Todo</button>
        <button type="button" onClick={clearTodos}>
          Clear
        </button>
      </form>
    </>
  );
};

export default TodoForm;
