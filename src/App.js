import React from 'react';
import BarChart from './BarChart.js';
//import logo from './logo.svg';
import './App.css';
  
class App extends React.Component {

state = {
    data: [5, 5, 6, 6, 9, 10],
    width: 700,
    height: 500,
    id: "root"
    }
    render() {
    return ( <BarChart data={this.state.data} width={this.state.width} height={this.state.height}/> )
    }
}

export default App;
