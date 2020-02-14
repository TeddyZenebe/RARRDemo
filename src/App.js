import React from "react";
//import { HashRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
//import Landing from './pages/Landing';
import Private from './pages/Private';

//import { ProtectedRoute } from "./protectedRoute";


const App = () => {




    return (
        //{<Router>
        //    <Switch>
        //        <Route exact path="/" component={Landing} />
        //        <ProtectedRoute exact path="/private" component={Private} />
        //        <Route path="*" component={() => "404 NOT FOUND"} />
        //    </Switch>
        //</Router >}

        <div>
            <Private />
        </div>
    );
}

export default App;

