import React, { Component } from 'react';
var server = require('../server.js');

class Form extends React.Component {
    render () {
        return (
            <div>
                <fieldset>
                    <form action="/" method="post">
                        <input name="city" type="text" placeholder="Enter a City" required></input>
                        <input type="submit" value="Get Weather"></input>
                    </form>
                </fieldset>
                <div>
                    <h1>It is {this.props.weather} degrees Celsius!</h1>
                </div>
            </div>
        )
    }
}

class App extends React.Component {
    consructor(props) {
        super(props);
        this.state = {
            weather=server.weather
        }
    }

    render () {
        return (
            <Form weather={this.state.weather}/>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"));