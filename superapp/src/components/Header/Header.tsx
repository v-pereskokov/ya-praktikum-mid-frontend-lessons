import React from 'react';

import {Props} from './types';

import logo from '../../assets/images/logo.svg';
import './Header.css';

const Header: Props = ({link}) => (
    <header className="header">
        <img src={logo} className="header-logo" alt="logo"/>

        <p>
            Edit <code>src/containers/App/App.tsx</code> and save to reload.
        </p>

        <a
            className="header-link"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
        >
            Learn React
        </a>
    </header>
);
export default Header;
