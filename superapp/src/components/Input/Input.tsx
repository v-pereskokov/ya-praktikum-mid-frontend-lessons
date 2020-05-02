import React, {Component} from 'react';

type OwnProps = React.InputHTMLAttributes<HTMLInputElement> & {
    customField: string;
};
type Props = OwnProps;

export default class Input extends Component<Props> {
    public render() {
        const {onChange, value} = this.props;

        return (
            <input onChange={onChange} value={value}/>
        );
    }
}
