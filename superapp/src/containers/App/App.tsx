import React, {PureComponent} from 'react';

import Todos from '../../components/Todos'

import './App.css';

export default class App extends PureComponent {
    public render() {
        return (
            <div className="app">
              <Todos/>
            </div>
        );
    }
}
