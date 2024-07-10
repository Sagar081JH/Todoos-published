import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import Todo from "./Todo";
import "../App.css";
import axios from "axios";

export default function TodosWithSpring() {
  const [todoHeadline, setTodoHeadline] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  const [todos, setTodos] = useState([]);

  const [editedTodoId, setEditedTodoId] = useState(0);

  const [actionMessage, setActionMessage] = useState("");
  const [msgColor, setMsgColor] = useState("");
  const [headlineError, setHeadlineError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [isEditHeadlineClicked, setIsEditHeadlineClicked] = useState(false);
  const [editedHeadline, setEditedHeadline] = useState(todoHeadline);

  const [isEditDescriptionClicked, setIsEditDescriptionClicked] =
    useState(false);
  const [editedDescription, setEditedDescription] = useState(todoDescription);

  const [apiError, setApiError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/todos")
      .then(function (response) {
        if (response.status === 200) {
          console.log("status " + response.status);
          return response.json();
        } else if (response.status === 204) {
          console.log("http status : 204");
          throw new Error("No task available...Plese add task");
        } else if (response.status === 500) {
          console.log("http status : 500");
          throw new Error("Internal Server Error");
        } else {
          console.log("http status : " + response.status);
          throw new Error("Network response was not ok.");
        }
      })
      .then((data) => setTodos(data))
      .catch(function (error) {
        if (error.message === "Failed to fetch") {
          setApiError(
            error.message + ": Server might be down...please try later"
          );
        } else {
          setApiError(error.message);
        }
        console.log(
          "There has been a problem with your fetch operation: ",
          error.message
        );
      });
  }, [todos]);

  function addTask(headline, description) {
    if (headline === "" || description === "") {
      if (description === "") {
        setDescriptionError("Please enter description...");
      }
      if (headline === "") {
        setHeadlineError("Please enter a headline...");
      }
    } else {
      axios
        .post("http://localhost:8080/todos", {
          headline: headline,
          description: description,
        })
        .then((response) => response.json())
        .catch((err) => {
          setApiError("Failed to add a task due to : " + err.message);
          console.log("error :" + err.message);
        });

      if (apiError === "") {
        setActionMessage("Task Added !!!");

        setHeadlineError("");
        setDescriptionError("");
        setMsgColor("green");
        setTimeout(() => {
          setActionMessage("");
        }, 2000);
      }
    }
    setTimeout(() => {
      setHeadlineError("");
      setDescriptionError("");
    }, 2000);
  }

  function deleteTask(id) {
    axios
      .delete(`http://localhost:8080/todos/delete/${id}`)
      .then((response) => response.json)
      .catch((err) => {
        setApiError("Deletion failed due to : " + err.message);
        console.log("delete : " + err);
      });

    if (apiError === "") {
      setActionMessage("Task Deleted !!!");
      setMsgColor("red");
      setTimeout(() => {
        setActionMessage("");
      }, 3000);
    }
  }

  function editTaskHeadline(todo) {
    setEditedTodoId(todo.todoId);
    setEditedHeadline(todo.headline);
    setIsEditHeadlineClicked(true);
  }

  function editTaskDescription(todo) {
    setEditedTodoId(todo.todoId);
    setEditedDescription(todo.description);
    setIsEditDescriptionClicked(true);
  }

  function saveHeadline(newHeadline, todo) {
    axios
      .put(`http://localhost:8080/todos/update/${todo.todoId}`, {
        todoId: todo.todoId,
        headline: newHeadline,
        description: todo.description,
      })
      .then((response) => response.json)
      .catch((err) => {
        setApiError("Headline upadate failed due to : " + err.message);
        console.log("saveHeadline : " + err);
      });

    if (apiError === "") {
      setIsEditHeadlineClicked(false);

      setMsgColor("blue");
      setActionMessage("Task Headline Updated !!!");
      setTimeout(() => {
        setActionMessage("");
      }, 3000);
    }
  }

  function saveDescription(editedDescription, todo) {
    axios
      .put(`http://localhost:8080/todos/update/${todo.todoId}`, {
        todoId: todo.todoId,
        headline: todo.headline,
        description: editedDescription,
      })
      .then((response) => response.json)
      .catch((err) => {
        setApiError("Description upadate failed due to : " + err.message);
        console.log("saveDesc : " + err);
      });

    if (apiError === "") {
      setIsEditDescriptionClicked(false);
      setMsgColor("blue");
      setActionMessage("Task Description Updated !!!");
      setTimeout(() => {
        setActionMessage("");
      }, 3000);
    }
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

  function clearFields() {
    setTodoHeadline("");
    setTodoDescription("");
  }
  return (
    <>
      <div className="container p-3">
        <Todo todos={todos}></Todo>

        <div className="navbar fixed-top mt-4 pt-5">
          <div
            className={`navbar fixed-top mx-4 text-center ${
              isToggleClicked ? "bg-dark text-light" : "bg-light text-dark"
            } fs-1 border border-outline-info border-radius-lg rounded-3 p-2`}
          >
            <span>
              Todoos
              <img
                style={{ margin: "5px" }}
                height={"40px"}
                width={"40px"}
                src="./todos-images/todo-icon.png"
              ></img>
            </span>
            <button
              type="button"
              className={`btn ${toggleButtonColor}`}
              onClick={() => setIsToggleClicked(!isToggleClicked)}
            >
              {isToggleClicked ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>

        {/* <h1>spring dds</h1> */}

        {/* <div>{resp.data}</div> */}

        <div className="mt-5 pt-5">
          <div className="mb-3">
            <label
              htmlFor={`${
                isToggleClicked ? "headlineInputDark" : "headlineInputLight"
              }`}
              className={`form-label text-start ${
                isToggleClicked ? "text-light" : "text-dark"
              }`}
            >
              Task headline...
            </label>
            <span
              className={`mx-5 ${
                isToggleClicked ? "text-info" : "text-danger"
              }`}
            >
              {headlineError}
            </span>
            <input
              type="text"
              id={`${
                isToggleClicked ? "headlineInputDark" : "headlineInputLight"
              }`}
              placeholder="write your task headline..."
              className={`input ${
                isToggleClicked ? "bg-dark text-light" : "bg-light text-dark"
              } form-control`}
              value={todoHeadline}
              onChange={(e) => setTodoHeadline(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor={`${
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
              className={`mx-4 ${
                isToggleClicked ? "text-info" : "text-danger"
              }`}
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
                className={`btn btn-outline-info ${
                  isToggleClicked ? "text-light" : "text-dark"
                }`}
                onClick={() => clearFields()}
              >
                Clear Fields
              </button>
            </span>
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
          </div>
          <div className="row justify-content-start">
            <div
              className={`col-3 fs-3 ${
                isToggleClicked ? "text-light" : "text-dark"
              }`}
            >
              Tasks
            </div>

            <div className="col-6 text-start p-2" style={{ color: msgColor }}>
              {actionMessage}
              <div className="text-danger">{apiError.toString()}</div>
            </div>
            <hr className={`${isToggleClicked ? "text-light" : "text-dark"}`} />
          </div>

          <div>
            <div>
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
                      className={`text-center ${
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
                      className={`text-center ${
                        isToggleClicked ? "text-info" : "text-primary"
                      }`}
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      style={{ marginLeft: "50px", paddingLeft: "50px" }}
                      className={`text-center ${
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
                      {/* <td scope="row">{todo.todoId}</td> */}
                      <td>
                        {isEditHeadlineClicked &&
                        editedTodoId === todo.todoId ? (
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
                      <td className="text-center">
                        {isEditHeadlineClicked &&
                        editedTodoId === todo.todoId ? (
                          <span>
                            <button
                              className="btn text-dark btn-outline-success mx-2"
                              onClick={() => saveHeadline(editedHeadline, todo)}
                            >
                              &#x2611;
                            </button>
                            <button
                              className="btn text-danger btn-outline-success mx-2"
                              onClick={() => setIsEditHeadlineClicked(false)}
                            >
                              &#x2612;
                            </button>
                          </span>
                        ) : (
                          <></>
                        )}
                        {!isEditHeadlineClicked ? (
                          <span className="p-2">
                            <Tooltip anchorSelect=".edit-headline" place="top">
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
                        editedTodoId === todo.todoId ? (
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
                      <td className="text-center">
                        {isEditDescriptionClicked &&
                        editedTodoId === todo.todoId ? (
                          <span>
                            <button
                              className="text-dark btn btn-outline-success"
                              onClick={() =>
                                saveDescription(editedDescription, todo)
                              }
                            >
                              &#x2611;
                            </button>
                            <button
                              className="btn text-danger btn-outline-success mx-2"
                              onClick={() => setIsEditDescriptionClicked(false)}
                            >
                              &#x2612;
                            </button>
                          </span>
                        ) : (
                          <></>
                        )}
                        {!isEditDescriptionClicked ? (
                          <span className="p-1">
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
                      <td
                        style={{ paddingLeft: "50px" }}
                        className="text-center"
                      >
                        <Tooltip anchorSelect=".delete" place="top">
                          Delete Task
                        </Tooltip>
                        <a className="delete">
                          <button
                            type="button"
                            onClick={() => deleteTask(todo.todoId)}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
