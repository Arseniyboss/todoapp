import { useState, useEffect, useRef, FormEvent, FC } from "react";
import { FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { useTodoContext } from "../contexts/TodoContext";
import { Todo } from "../types/todo";

const TodoItem: FC<Todo> = ({ title, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);

  const { deleteTodo, editTodo } = useTodoContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      setValue(title);
      inputRef.current.focus();
    }
  }, [isEditing, title]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      if (value) {
        editTodo(value.trim(), id);
      }
      setIsEditing(false);
    }
  };

  return (
    <div className="todo">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={20}
          />
          <FaCheckCircle onClick={handleSubmit} className="check" />
        </form>
      ) : (
        <>
          {title}
          <div className="icons">
            <FaTrashAlt className="trashcan" onClick={() => deleteTodo(id)} />
            <MdModeEdit onClick={() => setIsEditing(true)} />
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
