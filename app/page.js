"use client";

import { useState } from "react";
import { CopilotPopup } from "@copilotkit/react-ui";
import { useCopilotAction } from "@copilotkit/react-core";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // add Action
  useCopilotAction({
    name: "addTodoItem",
    description: "Add a new todo item to the list",
    parameters: [
      {
        name: "todoText",
        type: "string",
        description: "The text of the todo item to add",
        required: true,
      },
    ],
    handler: async ({ todoText }) => {
      addTodo(todoText);
    },
  });

  // delete Action
  useCopilotAction({
    name: "deleteTodoItem",
    description: "Delete a new todo item from the list",
    parameters: [
      {
        name: "todoIndex",
        type: "number",
        description: "The index of the todo item to delete",
        required: true,
      },
    ],
    handler: async ({ todoIndex }) => {
      deleteTodo(todoIndex);
    },
  });

  const addTodo = (todoText) => {
    if (todoText.trim() !== "") {
      setTodos([...todos, todoText]);
      setNewTodo("");
    }
  };

  const deleteTodo = (indexToDelete) => {
    setTodos(todos.filter((_, index) => index !== indexToDelete));
  };

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  return (
    <div className="bg-gradient-to-br from-pink-100 to-purple-200 min-h-screen flex items-center justify-center p-4">
      <main className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="font-extrabold text-4xl mb-6 text-center text-purple-700">
          IntelliTask
        </h1>

        <div className="flex items-center justify-between space-x-2 mb-6">
          <textarea
            name="todo-input"
            id="todo-input"
            value={newTodo}
            onChange={handleInputChange}
            className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none min-h-[80px] text-gray-700 placeholder-gray-400"
            placeholder="What do you need to get done?"
            rows="4"
            aria-label="Enter new ToDo item"
          ></textarea>
          <button
            onClick={() => {
              addTodo(newTodo);
            }}
            className="px-4 py-4 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          >
            Add ToDo
          </button>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">
            My ToDos
          </h2>
          {todos.length === 0 ? (
            <p className="text-gray-500 italic text-center py-4">
              No todos yet. Add one above!
            </p>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm border border-purple-100 text-lg transition-transform transform hover:scale-[1.02]"
                >
                  <span className="flex-grow mr-4 break-words text-gray-800">
                    {todo}
                  </span>
                  <button
                    onClick={() => deleteTodo(index)}
                    className="flex-shrink-0 p-2 rounded-full text-white bg-red-500 hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    aria-label={`Delete ToDo: ${todo.text}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <CopilotPopup
          instructions={
            "You are assisting the user as best as you can. Answer in the best way possible given the data you have."
          }
          labels={{
            title: "Popup Assistant",
            initial: "Need any help?",
          }}
        />
      </main>
    </div>
  );
}
