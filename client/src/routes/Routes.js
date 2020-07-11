import React from 'react';
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "../containers/Login/Login";
import Dashboard from "../containers/Dashboard/Dashboard";

const ProtectedRoute = ({isAllowed, ...props}) => (
  isAllowed ? <Route {...props}/> : <Redirect to="/login"/>
);

const Routes = () => {
  const user = useSelector(state => state.users.user);

  return (
    <Switch>
      <Route path='/' exact render={() => <h1>Main Page</h1>}/>
      <Route path="/login" exact component={Login} />
      <ProtectedRoute isAllowed={user && user.role === 'admin'} path="/dashboard" exact component={Dashboard} />
    </Switch>
  );
};

export default Routes;