import React, {Component} from 'react';

type OwnProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type Props = OwnProps;

export default class Button extends Component<Props> {
    public render() {
        const {onClick, children} = this.props;

        return (
            <button onClick={onClick}>
                {children}
            </button>
        );
    }
}
