import React from 'react';
import { Route, Switch } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';

import BarChart from './components/BarChart.js';
import Home from "./components/Home"
import About from "./components/About"
import Error from "./components/Error"
  
class App extends React.Component {

state = {
    data: [5, 5, 6, 6, 9, 10],
    width: 700,
    height: 500,
    id: "root"
   
}
   
render() {
  //  return ( <BarChart data={this.state.data} width={this.state.width} height={this.state.height}/> )

  return (
    <main>
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/about" component={About} />
            <Route path="/charts" component={<BarChart data={this.state.data} width={this.state.width} height={this.state.height}/>} />
            <Route component={Error} />
        </Switch>
    </main>
)

}

}

export default App;
