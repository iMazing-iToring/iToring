import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './components/Main';
import Monitoring from './components/Monitoring'
import Register from './components/authentication/Register';
import Login from './components/authentication/Login';
import Profile from './components/authentication/Profile';

export default class App extends React.Component {
  render() {
      return(
      <Router> 
          <Switch>
          <Route exact path="/" component={Main}/>
          <Route path="/monitoring" component={Monitoring}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/profile=:userName" component={Profile}/>
          </Switch>
      </Router>
      )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
