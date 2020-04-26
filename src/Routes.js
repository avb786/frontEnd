import React from 'react';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import Home from "./core/Home"


const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
            </Switch>
        </BrowserRouter>
    )
}
export default Routes;