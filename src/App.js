import React from 'react';
import Navigation from "./components/Navigation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Header from "./components/Header";
import Section from "./components/Section";
import SignIn from './components/SignIn';
import Trade from './components/Trade';
import MyAssets from './components/MyAssets';
import Welcome from './components/Welcome';
import Footer from "./components/Footer";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          <Route path="/signIn" exact>
            <SignIn />
          </Route>
          <Route path="/welcome" exact>
            <Welcome />
          </Route>
          <Route path="/trade" exact>
            <Trade />
          </Route>
          <Route path="/myAssets" exact>
            <MyAssets />
          </Route>
          <Route path="/" exact>
            <Header />
            <Section />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
