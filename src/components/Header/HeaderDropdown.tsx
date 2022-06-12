import React from 'react';
import { Dropdown, DropDownProps } from 'antd';
import styles from './HeaderDropdown.module.css';

export type HeaderDropdownProps = {
    overlayClassName?: string;
    overlay: React.ReactNode | (() => React.ReactNode) | any;
    placement?:
        | 'bottomLeft'
        | 'bottomRight'
        | 'topLeft'
        | 'topCenter'
        | 'topRight'
        | 'bottomCenter';
} & Omit<DropDownProps, 'overlay'>;

export const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
    overlayClassName: cls,
    ...restProps
}) => <Dropdown overlayClassName={styles.container} {...restProps} />;
