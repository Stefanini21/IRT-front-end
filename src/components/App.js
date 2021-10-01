import React, { Component } from "react";
import '../styles/App.css';
import { Button } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';

const InputExampleInput = () => <Input loading placeholder='Search...' />


class App extends Component {

    render() {
        return (
            <div>
                <h1>My React App!..</h1>
                <InputExampleInput />
                <Button primary>Primary</Button>
                <Button secondary>Secondary</Button>
            </div>
        );
    }
}

export default App;