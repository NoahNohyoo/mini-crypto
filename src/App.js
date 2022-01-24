import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import routes from './routes';
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          {routes.map(route => {
            return (
              <Route
                key={route.path}
                path={route.path}
                exact
              >
                <route.component />
              </Route>
            )
          })}
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
