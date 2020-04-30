import React, {PureComponent} from 'react';

import Header from '../../components/Header'
import ErrorBoundry from '../../components/ErrorBoundry'

import './App.css';

export default class App extends PureComponent {
    public render() {
        return (
            <div className="app">
              <Header link="https://reactjs.org"/>

              <ErrorBoundry>
                  <div className="content">
                      Content
                  </div>
              </ErrorBoundry>
            </div>
        );
    }
}
