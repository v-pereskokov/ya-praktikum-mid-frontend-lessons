import React, {PureComponent} from 'react';

import Header from '../../components/Header'

import './App.css';

export default class App extends PureComponent {
    public render() {
        return (
            <div className="app">
              <Header link="https://reactjs.org"/>
            </div>
        );
    }
}
