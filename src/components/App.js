import React, { Component } from "react";
import { connect } from "react-redux"

class App extends Component {
  // updateCounter(value) {
  //   this.setState({ 
  //     counter: this.state.counter + value 
  //   });
  // }

  render() {
    console.log("APP", this.props)
    return (
      <div>
        <h1>Counter <strong>{this.props.counter}</strong></h1>
        <hr />
        <div>
          <button onClick={this.props.onAdd}>+ 1</button>
          <button onClick={this.props.onSub}>- 1</button>  

          <button onClick={() => this.props.onAddNumber(15)}>+ 15</button>
          <button onClick={() => this.props.onAddNumber(-17)}>- 17</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAdd: () => dispatch({type: 'ADD'}),
    onSub: () => dispatch({type: 'SUB'}),
    onAddNumber: number => dispatch({type: 'ADD_NUMBER', payload: number})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);






