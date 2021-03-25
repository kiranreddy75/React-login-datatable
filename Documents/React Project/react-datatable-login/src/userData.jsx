import React, { Component } from "react";
import users from "./users-response.json";
import todos from "./todos-response.json";
import DataTable from "react-data-table-component";

class UserData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userId: "",
      isLogedIn: false,
      loggedInUserData: []
    };
  }

  handleLogin = (event) => {
    const userName = this.state.userName;
    if (userName) {
      for (let user of users) {
        if (userName === user.username) {
          const userData = [];
          if (todos) {
            for (let todo of todos) {
              if (user.id === todo.userId) {
                userData.push({
                  userId: todo.userId,
                  id: todo.id,
                  title: todo.title,
                  completed: todo.completed
                });
              }
            }
          }
          this.setState({
            isLogedIn: true,
            userId: user.id,
            loggedInUserData: userData
          });
          return;
        }
      }
      alert(`No user with username ${userName} was found.`);
    }
    event.preventDefault();
  };

  handleLogoutAction = (event) => {
    this.setState({
      isLogedIn: false
    });
  };

  handleUserName = (event) => {
    this.setState({
      userName: event.target.value
    });
  };
  handleCompletedTodos = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const userData = [];
    if (todos) {
      for (let todo of todos) {
        if (value) {
          if (todo.completed && this.state.userId === todo.userId) {
            userData.push({
              userId: todo.userId,
              id: todo.id,
              title: todo.title,
              completed: todo.completed
            });
          }
        } else {
          if (this.state.userId === todo.userId) {
            userData.push({
              userId: todo.userId,
              id: todo.id,
              title: todo.title,
              completed: todo.completed
            });
          }
        }
      }
    }
    this.setState({
      loggedInUserData: userData
    });
  };
  render() {
    const { userName, userId, isLogedIn, loggedInUserData } = this.state;
    const buttonLogin = {
      backgroundColor: "#4CAF50",
      border: "none",
      color: "white",
      padding: "7px 32px",
      textAlign: "center",
      fontSize: "14px"
    };
    const buttonLogout = {
      backgroundColor: "#f44336",
      border: "none",
      color: "white",
      padding: "7px 32px",
      textAlign: "center",
      fontSize: "14px",
      position: "absolute",
      right: "0",
      zIndex: "5"
    };
    const inputStyle = {
      margin: "15px"
    };
    const columns = [
      {
        name: "user ID",
        selector: "userId",
        sortable: true
      },
      {
        name: "ID",
        selector: "id",
        sortable: true
      },
      {
        name: "Title",
        selector: "title",
        sortable: true
      }
    ];

    return (
      <React.Fragment>
        {!isLogedIn && (
          <div className="userLoginForm">
            <form onSubmit={this.handleLogin}>
              <h3>User Login Page</h3>
              <div style={inputStyle}>
                <label>
                  Username:
                  <input
                    type="text"
                    placeholder="username"
                    required
                    onChange={this.handleUserName}
                  />
                </label>
              </div>
              <div style={inputStyle}>
                <label>
                  Password:
                  <input
                    type="password"
                    placeholder="password"
                    minLength="6"
                    required
                  />
                </label>
              </div>
              <button
                style={buttonLogin}
                type="submit"
                onClick={this.handleLoginAction}
              >
                Login
              </button>
            </form>
          </div>
        )}
        {isLogedIn && (
          <div className="userTodos">
            <button
              style={buttonLogout}
              type="button"
              onClick={this.handleLogoutAction}
            >
              Logout
            </button>
            <h3>{userName}'s Todo List</h3>
            <form>
              <label style={{ color: "green" }}>
                Show completed Todos
                <input type="checkbox" onClick={this.handleCompletedTodos} />
              </label>
            </form>
            <DataTable
              columns={columns}
              data={loggedInUserData}
              defaultSortField="title"
              pagination
              selectableRows
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default UserData;