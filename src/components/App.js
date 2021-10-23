import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}