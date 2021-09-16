import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import PageLogin from "../Pages/PageLogin";
import PageRegistration from "../Pages/PageRegistration";
import PageTimeline from "../Pages/PageTimeline";
import UserContext from "../contexts/UserContext";
import Reset from "../styled-components/Reset";

export default function App() {
  const [user, setUser] = useState("");
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Reset />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <PageLogin />
          </Route>
          <Route path="/sign-up" exact>
            <PageRegistration />
          </Route>
          <Route path="/timeline" exact>
            <PageTimeline />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
