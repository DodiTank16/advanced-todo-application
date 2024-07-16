import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../models/models";
import { FaPencilAlt, FaCheck } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdOutlineUndo, MdSubdirectoryArrowRight } from "react-icons/md";
import InputField from "./InputField";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo: React.FC<Props> = ({
  todo,
  todos,
  setTodos,
  index,
  setCompletedTodos,
  ...props
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [edit, setEdit] = useState<boolean>(false);
  const [todoValue, setTodoValue] = useState<string>(todo.name);

  const handleEdit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, name: todoValue } : todo
      )
    );
    setEdit(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value);
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        const searchElement = document.getElementsByName("taskName")[0] as any;
        if (searchElement) {
          searchElement.blur();
          setTodoValue("");
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount or on input change
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleCompleted = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    const completedTodo = todos.find((todo) => todo.id === id);

    if (completedTodo) {
      completedTodo.isDone = !completedTodo.isDone;
      setTodos(updatedTodos);
      setCompletedTodos([...todos, completedTodo]);
    }
  };
  console.log(todos);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <>
      <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided, snapshot) => (
          <div
            className={`todo-single ${snapshot.isDragging ? "drag" : ""}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            {edit ? (
              <InputField
                type="text"
                name="taskName"
                id="edittodoinput"
                className="h-10 w-full text-black outline-none"
                placeholder="Enter a task"
                value={todoValue}
                onChange={(e) => handleChange(e)}
                ref={inputRef}
              />
            ) : todo.isDone ? (
              <s className="todo-single-text">{todo.name}</s>
            ) : (
              <span className="todo-single-text">{todo.name}</span>
            )}

            {!edit ? (
              <span
                className="icon"
                onClick={() => {
                  setEdit(!edit);
                  inputRef.current?.focus();
                }}>
                <FaPencilAlt />
              </span>
            ) : (
              <span className="icon" onClick={(e) => handleEdit(e, todo?.id)}>
                <MdSubdirectoryArrowRight />
              </span>
            )}

            <span className="icon" onClick={() => handleDelete(todo?.id)}>
              <RiDeleteBin6Fill />
            </span>

            <span className="icon" onClick={() => handleCompleted(todo?.id)}>
              {todo.isDone ? <MdOutlineUndo /> : <FaCheck />}
            </span>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default SingleTodo;
