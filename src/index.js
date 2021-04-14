import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header';
import Footer from './shared/components/Footer/Footer';
import Home from './view/Home/Home';
import Hike from './view/Hike/Hike';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

ReactDOM.render(
  // <React.StrictMode>
  //   <Header />
  //   <Home />
  //   <Footer />
  // </React.StrictMode>
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/randos/:hikeId" component={Hike} />
      <Route render={() => <h1 style={{paddingTop: '3.5em'}}>404: page introuvable</h1>} />
    </Switch>
    <Footer />
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
