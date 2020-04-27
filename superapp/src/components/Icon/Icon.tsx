import React, {useMemo} from 'react';

import {Props} from './types';
import {cn} from '../../utils/classnames';

import './Icon.css';

const Icon: Props = ({src, className = '', alt}) => {
    const classNames = useMemo(() => {
        return cn('icon', className);
    }, [className]);

    return (
        <img
            src={src}
            className={classNames}
            alt={alt}
        />
    );
};
export default Icon;
