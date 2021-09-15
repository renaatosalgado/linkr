import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../reset-css/reset.css";

import Timeline from "./timeline/Timeline";

import UserContext from "../contexts/UserContext";

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/timeline">
            <Timeline />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
