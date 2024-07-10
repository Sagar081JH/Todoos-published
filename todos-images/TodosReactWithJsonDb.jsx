import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import "../App.css";

export default function TodosReactWithJsonDb() {
  const [todoHeadline, setTodoHeadline] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  const [todos, setTodos] = useState([]);

  const [id, setId] = useState(0);

  const [actionMessage, setActionMessage] = useState("");
  const [msgColor, setMsgColor] = useState("");
  const [headlineError, setHeadlineError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [editedTodoId, setEditedTodoId] = useState(0);

  const [isEditHeadlineClicked, setIsEditHeadlineClicked] = useState(false);
  const [editedHeadline, setEditedHeadline] = useState(todoHeadline);

  const [isEditDescriptionClicked, setIsEditDescriptionClicked] =
    useState(false);
  const [editedDescription, setEditedDescription] = useState(todoDescription);

  const [myName, setMyname] = useState("Developed by : Sagar Ghumare");

  useEffect(() => {
    setTimeout(() => {
      setMyname("");
    }, 2000);
  }, []);

  function addTask(headline, description) {
    if (headline == "" || description == "") {
      if (description == "") {
        setDescriptionError("Please enter description...");
      }
      if (headline == "") {
        setHeadlineError("Please enter a headline...");
      }
    } else {
      setActionMessage("Task Added !!!");
      setId(id + 1);
      const newTask = {
        id,
        headline,
        description,
      };
      setTodos([newTask, ...todos]);
      setHeadlineError("");
      setDescriptionError("");
      setMsgColor("green");
      setTimeout(() => {
        setActionMessage("");
      }, 2000);
    }
    setTimeout(() => {
      setHeadlineError("");
      setDescriptionError("");
    }, 2000);
  }

  function deleteTask(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
    setActionMessage("Task Deleted !!!");
    setMsgColor("red");
    setTimeout(() => {
      setActionMessage("");
    }, 3000);
  }

  function editTaskHeadline(todo) {
    setEditedTodoId(todo.id);
    setEditedHeadline(todo.headline);
    setIsEditHeadlineClicked(true);
  }

  function editTaskDescription(todo) {
    setEditedTodoId(todo.id);
    setEditedDescription(todo.description);
    setIsEditDescriptionClicked(true);
  }

  function saveHeadline(newHeadline, editedTodoId) {
    let index = 0;

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id == editedTodoId) {
        break;
      }
      index = index + 1;
    }

    console.log("index :" + index);

    todos[index].headline = newHeadline;
    setTodos(todos);

    setIsEditHeadlineClicked(false);

    setMsgColor("blue");
    setActionMessage("Task Headline Updated !!!");
    setTimeout(() => {
      setActionMessage("");
    }, 3000);
  }

  function saveDescription(description, todoId) {
    let index = 0;

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id == todoId) {
        break;
      }
      index = index + 1;
    }

    console.log("index :" + index);

    todos[index].description = description;
    setTodos(todos);
    setIsEditDescriptionClicked(false);

    setMsgColor("blue");
    setActionMessage("Task Description Updated !!!");
    setTimeout(() => {
      setActionMessage("");
    }, 3000);
  }

  const [isToggleClicked, setIsToggleClicked] = useState(false);

  let toggleButtonColor = "btn-dark";
  if (isToggleClicked) {
    toggleButtonColor = "btn-light";
    document.body.style.backgroundColor = "black";
  } else {
    toggleButtonColor = "btn-dark";
    document.body.style.backgroundColor = "white";
  }

  function clearField() {
    setTodoHeadline("");
    setTodoDescription("");
  }
  return (
    <>
      <div className="container p-3">
        <div
          className={`navbar fixed-top text-center ${
            isToggleClicked ? "bg-dark text-light" : "bg-light text-dark"
          } fs-1 border border-outline-info border-radius-lg rounded-3 p-2`}
        >
          <span>
            Todoos
            <img src="./todo-icon" alt=""></img>
          </span>
          <button
            type="button"
            className={`btn ${toggleButtonColor}`}
            onClick={() => setIsToggleClicked(!isToggleClicked)}
          >
            {isToggleClicked ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div
          className={`text-end mt-5 pt-3 fs-8 ${
            isToggleClicked ? "text-light" : "text-info"
          }`}
        >
          {myName}
        </div>

        <div className="">
          <div class="mb-3">
            <label
              for={`${
                isToggleClicked ? "headlineInputDark" : "headlineInputLight"
              }`}
              className={`form-label text-start ${
                isToggleClicked ? "text-light" : "text-dark"
              }`}
            >
              Task headline...
            </label>
            <span
              className={`${isToggleClicked ? "text-info" : "text-danger"}`}
            >
              {headlineError}
            </span>
            <input
              type="text"
              id={`${
                isToggleClicked ? "headlineInputDark" : "headlineInputLight"
              }`}
              placeholder="write your task headline..."
              class="form-control"
              className={`form-control input ${
                isToggleClicked ? "bg-dark text-light" : "bg-light text-dark"
              }`}
              value={todoHeadline}
              onChange={(e) => setTodoHeadline(e.target.value)}
            />
          </div>
          <div class="mb-3">
            <label
              for={`${
                isToggleClicked
                  ? "descriptionInputDark"
                  : "descriptionInputLight"
              }`}
              className={`form-label ${
                isToggleClicked ? "text-light" : "text-dark"
              }`}
            >
              Task Description...
            </label>
            <span
              className={`${isToggleClicked ? "text-info" : "text-danger"}`}
            >
              {descriptionError}
            </span>
            <textarea
              placeholder="write your task decsciption..."
              className={`form-control ${
                isToggleClicked ? " bg-dark text-light" : "bg-light text-dark"
              }`}
              id={`${
                isToggleClicked
                  ? "descriptionInputDark"
                  : "descriptionInputLight"
              }`}
              value={todoDescription}
              onChange={(e) => setTodoDescription(e.target.value)}
            />
          </div>

          <div className="text-center">
            <span className="mx-2 my-2">
              <button
                className={`m-3 btn btn-outline-info ${
                  isToggleClicked ? "text-light" : "text-dark"
                }`}
                onClick={() => clearField()}
              >
                Clear Fields
              </button>
            </span>
            <span className="p-2">
              <button
                type="button"
                onClick={() => addTask(todoHeadline, todoDescription)}
                className={`btn w-75 ${
                  isToggleClicked
                    ? "text-light btn-outline-primary"
                    : "text-dark btn-outline-info"
                }`}
              >
                Add Task
              </button>
            </span>
          </div>
          {/* <hr className={`${isToggleClicked ? "text-light" : "text-dark"}`} /> */}
          <div class="row justify-content-start">
            <div
              className={`col-6 fs-3 ${
                isToggleClicked ? "text-light" : "text-dark"
              }`}
            >
              Tasks
            </div>
            <div className="col-6 text-start p-2" style={{ color: msgColor }}>
              {actionMessage}
            </div>
            <hr className={`${isToggleClicked ? "text-light" : "text-dark"}`} />
          </div>

          <div>
            <div>
              {todos.length > 0 ? (
                <table
                  className={`table ${
                    isToggleClicked ? "table-dark" : "table-light"
                  }`}
                >
                  <thead>
                    <tr>
                      {/* <th
                        scope="col"
                        className={`${
                          isToggleClicked ? "text-info" : "text-primary"
                        }`}
                      >
                        #
                      </th> */}
                      <th
                        scope="col"
                        className={`${
                          isToggleClicked ? "text-info" : "text-primary"
                        }`}
                      >
                        Headline
                      </th>
                      <th
                        scope="col"
                        className={`text-start ${
                          isToggleClicked ? "text-info" : "text-primary"
                        }`}
                      >
                        Action
                      </th>
                      <th
                        scope="col"
                        className={`${
                          isToggleClicked ? "text-info" : "text-primary"
                        }`}
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className={`text-start ${
                          isToggleClicked ? "text-info" : "text-primary"
                        }`}
                      >
                        Action
                      </th>
                      <th
                        scope="col"
                        className={`text-start ${
                          isToggleClicked ? "text-info" : "text-primary"
                        }`}
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {todos.map((todo) => (
                      <tr>
                        {/* <td scope="row">{todo.id}</td> */}
                        <td>
                          {isEditHeadlineClicked && editedTodoId == todo.id ? (
                            <span>
                              <input
                                id={`${
                                  isToggleClicked
                                    ? "headlineEditInputDark"
                                    : "headlineEditInputLight"
                                }`}
                                className={`form-control ${
                                  isToggleClicked
                                    ? "bg-dark text-light"
                                    : "bg-light text-dark"
                                }`}
                                placeholder="edit headline..."
                                value={editedHeadline}
                                onChange={(e) =>
                                  setEditedHeadline(e.target.value)
                                }
                              />
                            </span>
                          ) : (
                            <>{todo.headline}</>
                          )}
                        </td>
                        <td className="text-start">
                          {isEditHeadlineClicked && editedTodoId == todo.id ? (
                            <span>
                              <button
                                className="btn text-dark btn-outline-success"
                                onClick={() =>
                                  saveHeadline(editedHeadline, editedTodoId)
                                }
                              >
                                &#x2611;
                              </button>
                              <button
                                className="btn text-danger btn-outline-success"
                                onClick={() => setIsEditHeadlineClicked(false)}
                              >
                                &#x2612;
                              </button>
                            </span>
                          ) : (
                            <></>
                          )}
                          {!isEditHeadlineClicked ? (
                            <span className="text-start">
                              <Tooltip
                                anchorSelect=".edit-headline"
                                place="top"
                              >
                                Edit Headline
                              </Tooltip>
                              <a className="edit-headline">
                                <button
                                  type="button"
                                  onClick={() => editTaskHeadline(todo)}
                                  className={`btn ${
                                    isToggleClicked
                                      ? "text-light btn-outline-success"
                                      : "text-dark btn-outline-info"
                                  }`}
                                >
                                  &#9998;
                                </button>
                              </a>
                            </span>
                          ) : (
                            <></>
                          )}
                        </td>
                        <td>
                          {isEditDescriptionClicked &&
                          editedTodoId == todo.id ? (
                            <span>
                              <input
                                id={`${
                                  isToggleClicked
                                    ? "descEditInputDark"
                                    : "descEditInputLight"
                                }`}
                                className={`form-control ${
                                  isToggleClicked
                                    ? "bg-dark text-light"
                                    : "bg-light text-dark"
                                }`}
                                placeholder="edit description..."
                                value={editedDescription}
                                onChange={(e) =>
                                  setEditedDescription(e.target.value)
                                }
                              />
                            </span>
                          ) : (
                            <>{todo.description}</>
                          )}
                        </td>
                        <td className="text-start">
                          {isEditDescriptionClicked &&
                          editedTodoId == todo.id ? (
                            <span>
                              <button
                                className="text-dark btn btn-outline-success"
                                onClick={() =>
                                  saveDescription(editedDescription, todo.id)
                                }
                              >
                                &#x2611;
                              </button>
                              <button
                                className="btn text-danger btn-outline-success"
                                onClick={() =>
                                  setIsEditDescriptionClicked(false)
                                }
                              >
                                &#x2612;
                              </button>
                            </span>
                          ) : (
                            <></>
                          )}
                          {!isEditDescriptionClicked ? (
                            <span className="">
                              <Tooltip anchorSelect=".edit-desc" place="top">
                                Edit Description
                              </Tooltip>
                              <a className="edit-desc">
                                <button
                                  type="button"
                                  onClick={() => editTaskDescription(todo)}
                                  className={`btn ${
                                    isToggleClicked
                                      ? "text-light btn-outline-success "
                                      : "text-dark btn-outline-info"
                                  }`}
                                >
                                  &#9998;
                                </button>
                              </a>
                            </span>
                          ) : (
                            <></>
                          )}
                        </td>
                        <td className="text-start p-2">
                          <Tooltip anchorSelect=".delete" place="top">
                            Delete Task
                          </Tooltip>
                          <a className="delete">
                            <button
                              type="button"
                              onClick={() => deleteTask(todo.id)}
                              className="btn btn-danger px-2"
                            >
                              &#9003;
                            </button>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
