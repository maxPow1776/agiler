import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

export const ForbiddenPage = () => {
    return (
        <Result
            status='403'
            title='403'
            subTitle='Sorry, access forbidden.'
            extra={
                <Link to='/'>
                    <Button type='primary'>Back Home</Button>
                </Link>
            }
        />
    );
};
