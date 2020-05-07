import React, {PureComponent} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter,
    RouteComponentProps
} from 'react-router-dom';

import Todos from '../../components/Todos'

import './App.css';

function About() {
    return <h2>About</h2>;
}

function Users(props: RouteComponentProps) {
    console.log({props});

    // Для бест-практис: колбеки внутри FC надо оборачивать в React.useCallback
    const goToAbout = () => {
        props.history.push('/about');
    };

    return (
        <div>
            <h2>Users</h2>
            <p onClick={goToAbout}>
                Перейти в эбаут по пушу (кликни меня)
            </p>
        </div>
    );
}
const UsersWithRouter = withRouter(Users);

export default class App extends PureComponent {
    public render() {
        return (
            <div className="app">
                <Router>
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about">About</Link>
                                </li>
                                <li>
                                    <Link to="/users">Users</Link>
                                </li>
                            </ul>
                        </nav>

                        <Switch>
                            <Route path="/about">
                                <About />
                            </Route>

                            <Route path="/users/redirect" render={() => <Redirect to="/users"/>} exact/>
                            <Route path="/users" exact>
                                <UsersWithRouter/>
                            </Route>

                            <Route path="/">
                                <Todos/>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}
