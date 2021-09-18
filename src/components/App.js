import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import PageLogin from "../Pages/PageLogin";
import PageRegistration from "../Pages/PageRegistration";
import PageTimeline from "../Pages/PageTimeline";
import PageMyPosts from "../Pages/PageMyPosts";
import UserContext from "../contexts/UserContext";
import Reset from "../styled-components/Reset";
import { useEffect } from "react";

export default function App() {
  const UserData = JSON.parse(localStorage.getItem('LinkrUserData'));
  const [user, setUser] = useState(UserData);

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
          <Route path="/my-posts" exact>
            <PageMyPosts />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
