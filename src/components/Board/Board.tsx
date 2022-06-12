import React from 'react';
import Developer from '../../pages/Developer/Developer';
import Manager from '../../pages/Manager/Manager';

const Board: React.FC = () => {
    const user = {
        name: 'Иван Иванов',
        role: 'teamlead',
        loggedIn: true,
    };
    return (
        <div>
            {user.role === 'manager' ? <Manager /> : null}
            {user.role === 'developer' ? <Developer /> : null}
        </div>
    );
};

export default Board;
