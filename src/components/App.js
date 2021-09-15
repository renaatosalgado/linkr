import { BrowserRouter, Switch, Route } from 'react-router-dom'
import React from "react";
import "../reset-css/reset.css"
import PageLogin from "../Pages/PageLogin";
import PageRegistration from '../Pages/PageRegistration';

export default function App() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <PageLogin/>
        </Route>
        <Route path='/sign-up' exact>
          <PageRegistration/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}