import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';

import BarChart from './components/BarChart';
import Home from "./components/Home"
import About from "./components/About"
import Error from "./components/Error"

const BarCharts = (lazy(() => (import('./components/BarChart'))));
  
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
            <Route component={Error} />
            <Route
                path="/bar" component={<BarChart data={this.state.data} width={this.state.width} height={this.state.height}/>}
            />
            <Route path="/barc" exact component={BarCharts} onEnter={() => this.handleEnter()} />
        </Switch>
    </main>
)

}

}

export default App;
