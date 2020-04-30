import React, {ErrorInfo} from 'react';

import {State} from './types';

export default class ErrorBoundary extends React.PureComponent<unknown, State> {
    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error,
            errorInfo
        });
    }

    public render() {
        const {state} = this;
        const {children} = this.props;

        if (state.errorInfo) {
            return (
                <React.Fragment>
                    <h2>Something went wrong.</h2>
                    <details>
                        { state.error?.toString() }
                        <br/>
                        { state.errorInfo.componentStack }
                    </details>
                </React.Fragment>
            );
        }

        return children;
    }
}
