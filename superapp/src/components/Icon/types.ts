import {FC} from 'react';

interface OwnProps {
    src: string;
    className?: string;
    alt?: string;
}

export type Props = FC<OwnProps>;
