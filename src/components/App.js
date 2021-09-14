import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "../reset-css/reset.css";

import Timeline from "./timeline/Timeline";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/timeline">
          <Timeline />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
