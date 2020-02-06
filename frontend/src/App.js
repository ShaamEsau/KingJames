/* Imports React Library to be used */
import React from 'react';
/* Calls custom style sheet to style the page */
import './App.css';

/* Creates class component */
class App extends React.Component {

    constructor() {
        super();
        /* Sets the states default value */
        this.state = {
            users: [],
            userName: "",
            userPassword: ""
        }
    }

    /* Initializes an asynchronous life cycle that executes once component is called upon */
    componentDidMount = async () => {
        /* fetches the data stored in the api */
        var userData = await fetch("/api")
        /* Converts data to a JSON object */
        var userConv = await userData.json()
        /* Attempts execution of the information */
        try {
            /* Updates states with new information */
            this.setState({
                users: userConv
            })
            /* If an error occurs, retrieves error and executes this line */
        } catch (err) {
            /* Display error information in the console */
            console.log(err)
        }
    }

    /* Creates an arrow function */
    userLogin = (e) => {
      /* Stops elements preloaded functions like a submit type button refreshing the page on click */
        e.preventDefault();
        /* Generates a loop that will continue for the length of an array */
        for (var i = 0; i <= this.state.users.length; i++) {
          /* Checks if condition is met and executes corresponding lines of code */
            if (this.state.userName == this.state.users[i].User && this.state.userPassword == this.state.users[i].Password) {
                /* Displays a pop up with the text and state information */
                alert("Welcome " + this.state.userName + ", you have successfully logged in");
                /* Reloads the page */
                document.location.reload();
            } else {
                /* Displays a pop up with the text */
                alert("Username or Password incorrect :(");
                /* Reloads the page */
                document.location.reload();
            }

        }
    }

    /* Creates an arrow function */
    postUser = (e) => {
        /* Stops elements preloaded functions like a submit type button refreshing the page on click */
        e.preventDefault();
        try {

            /* Creates a variable that stores an object with states values */
            let addUser = {
                User: this.state.userName,
                Password: this.state.userPassword
            }
            /* Generates a loop that will continue for the length of an array */
            for (var i = 0; i <= this.state.users.length; i++) {
                /* Checks if condition is met and executes corresponding lines of code */
                if (this.state.userName == this.state.users[i].User) {
                    /* Displays a pop up with the text */
                    alert("Username already taken!!");
                    break;
                    /* Reloads the page */
                    document.location.reload();
                } else {
                    /* Retrieves the api */
                    fetch("/api", {
                        /* Finds and executes the POST method for the data */
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        /* Converts data to JSON and saves it to the body-parser */
                        body: JSON.stringify(addUser)
                    })
                    /* Displays a pop up with the text */
                    alert("Login has been created!!!");
                    /* Reloads the page */
                    document.location.reload();
                }
            }
        } catch (err) {
            console.log(err);
        }
    }


    /* Converts data to a web readable format */
    render() {
        /* Data to be executed to the web page */
        return (
          /* Creates a div box */
            <div id="loginBox">
      {/* Creates a form section */}
      <form>
        <div id="heading">Login</div>
      {/* Creates a text box where a users input changes the states value according to what's in the textbox */}
        <input id="infoBox" type="text" size="30" placeholder="Username"
          onChange={e => this.setState({ userName : e.target.value })}/>
        <br/>
        <input id="infoBox" type="text" size="30" placeholder="Password"
          onChange={e => this.setState({ userPassword : e.target.value })}/>
        <br/>
      {/* Creates a button that when clicked, executes the corresponding function within the component */}
        <button id="signInorUp" onClick = {this.userLogin}>Sign In</button> 
        <button id="signInorUp" onClick = {this.postUser}>Register</button> 
      </form>
    </div>
        );
    }
}

export default App;