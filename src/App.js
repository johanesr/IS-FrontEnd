import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
    Link,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import NavigationBar from './components/navbar/navbar';
import News from './components/news/news';
import Home from './components/home/home';
import Footer from './components/footer/footer';


class App extends Component {
  render() {
    return (
      <div className="App">
          <NavigationBar/>
          <News/>
          <Switch>
              <Route exact path="/" component={ Home } />
          </Switch>
          <Footer/>
      </div>
    );
  }
}

export default App;
