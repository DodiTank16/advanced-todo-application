import React from "react";
import { Todo } from "../models/models";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
  ...props
}: Props) => {
  return (
    <>
      <div className="container">
        <Droppable droppableId="TodosList">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              className={`todos m-5 ${
                snapshot.isDraggingOver ? "dragactive" : ""
              }`}
              {...provided.droppableProps}>
              <span className="text-center text-xl">Active/Pending Tasks</span>
              {todos.length ? (
                todos.map((todo, index) => (
                  <SingleTodo
                    index={index}
                    todo={todo}
                    key={todo.id}
                    todos={todos}
                    setTodos={setTodos}
                    setCompletedTodos={setCompletedTodos}
                  />
                ))
              ) : (
                <h2 className="text-center text-base">"No Task Found"</h2>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="TodosRemove">
          {(provided, snapshot) => (
            <div
              className={`todos m-5 remove ${
                snapshot.isDraggingOver ? "dragactive" : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}>
              <span className="text-center text-xl">Completed Tasks</span>
              {completedTodos.length ? (
                completedTodos.map((todo, index) => (
                  <SingleTodo
                    index={index}
                    todo={todo}
                    key={todo.id}
                    todos={completedTodos}
                    setTodos={setTodos}
                    setCompletedTodos={setCompletedTodos}
                  />
                ))
              ) : (
                <h2 className="text-center text-base">"No Task Found"</h2>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};

export default TodoList;
