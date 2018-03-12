import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import DynamicVenn from './DynamicVenn';
import RouteNotFound from './RouteNotFound';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" render={() => (<Redirect to="/venn/3"/>)}/>
                        <Route exact path="/venn/:setCount([234])" component={DynamicVenn}/>
                        <Route component={RouteNotFound}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
