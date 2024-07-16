import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import { Todo } from "../models/models";
import TodoList from "../components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const Home: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todoName, setTodoName] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value);
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        const searchElement = document.getElementsByName("taskName")[0] as any;
        if (searchElement) {
          searchElement.blur();
          setTodoName("");
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount or on input change
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const searchElement = document.getElementsByName("taskName")[0] as any;
    searchElement.blur();
    inputRef.current?.blur();
    if (todoName) {
      if (
        todos.some((todo) => todo.name === todoName) ||
        completedTodos.some((todo) => todo.name === todoName)
      ) {
        alert("Task Already exists");
        setTodoName("");
        return;
      }
      setTodos([
        ...todos,
        { id: Date.now().toString(), name: todoName, isDone: false },
      ]);
      setTodoName("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = todos,
      complete = completedTodos;

    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  useEffect(() => {
    const ctrl1 = (e: KeyboardEvent) => e.ctrlKey && e.key === "k";

    const handler = (e: KeyboardEvent) => {
      if (ctrl1(e)) {
        // alert("shortcut");
        const searchElement = document.getElementsByName("taskName")[0] as any;
        searchElement.focus();
      }
    };

    const ignore = (e: KeyboardEvent) => {
      if (ctrl1(e)) {
        e.preventDefault();
      }
    };

    window.addEventListener("keyup", handler);
    window.addEventListener("keydown", ignore);

    return () => {
      window.removeEventListener("keyup", handler);
      window.removeEventListener("keydown", ignore);
    };
  }, []);

  return (
    <>
      <div className="bg-[#ffffff]">
        <DragDropContext onDragEnd={onDragEnd}>
          <form
            onSubmit={(e) => {
              handleAdd(e);
              inputRef.current?.blur();
            }}>
            <div className="m-5 flex">
              <InputField
                type="text"
                name="taskName"
                id="todoinput"
                className="input-field h-10 w-full border-4 border-gray-300 relative"
                placeholder="Enter a task"
                todo={todoName}
                onChange={(e) => handleChange(e)}
                ref={inputRef}
              />

              <p
                className="shotcut-message"
                onClick={() => {
                  if (
                    document.getElementById("todoinput") ===
                    document.activeElement
                  ) {
                    console.log("Element has focus!");
                  } else {
                    console.log(`Element is not focused.`);
                  }
                  document.getElementsByName("taskName")[0]?.focus();
                }}>
                Ctrl + K
              </p>

              <SubmitButton
                name="addTask"
                placeholder="Add"
                className="add-button">
                <span className="button__text">Add</span>
                <span className="button__icon">
                  <svg
                    width="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    stroke="currentColor"
                    height="24"
                    fill="none"
                    className="svg">
                    <line y2="19" y1="5" x2="12" x1="12"></line>
                    <line y2="12" y1="12" x2="19" x1="5"></line>
                  </svg>
                </span>
              </SubmitButton>
            </div>
          </form>

          <TodoList
            todos={todos}
            setTodos={setTodos}
            completedTodos={completedTodos}
            setCompletedTodos={setCompletedTodos}
          />
        </DragDropContext>
      </div>
    </>
  );
};

export default Home;
