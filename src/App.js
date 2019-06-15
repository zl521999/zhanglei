import React, { Component } from 'react';

import {BrowserRouter,Route,Switch,Redirect} from "react-router-dom"

import Login from "./pages/login/login.jsx"
import Admin from "./pages/admin/admin.jsx"

export default class App extends Component{
  render () {
    return (
      <BrowserRouter>
        <Switch>
          {/* 路由注册 */}
          <Route path="/login" component={Login}></Route>
          <Route path="/admin" component={Admin}></Route>   
          {/* 重新指定路由的页面 */}
          <Redirect to="/login"/>
        </Switch>
      </BrowserRouter>  
    );
  }
}

 

