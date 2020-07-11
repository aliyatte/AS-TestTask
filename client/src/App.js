import React, {Fragment} from "react";
import AppToolbar from "./components/UI/Toolbar/AppToolbar";
import Routes from "./routes/Routes";

const App = () => {

  return (
    <Fragment>
      <AppToolbar />
      <Routes />
    </Fragment>
  );
};

export default App;
